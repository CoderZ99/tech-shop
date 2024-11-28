const bcrypt = require("bcrypt")

const authService = require("../services/auth")
const userService = require("../services/user")
const tokenService = require("../services/token")

const { logger } = require("../logger")

const authController = {
  // Register
  register: async (req, res) => {
    try {
      const username = req.body.username.toLowerCase()
      // Check if the username already exists
      let checkUsername = await userService.getByUsername(username)
      if (checkUsername) {
        throw new Error("Tên tài khoản đã tồn tại!")
      }

      // Hash the password
      const password = req.body.password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      logger.debug(`register password: ${password}`)
      logger.debug(`password-hashed: ${hashedPassword}`)

      // Other user info
      // Create the new user
      logger.debug(`register: ~ req.body:`, req.body)
      const created = await authService.register({
        username,
        password: hashedPassword,
        name: req.body?.name,
        role: req.body?.role,
        phone: req.body?.phone,
        status: req.body?.status,
        email: req.body?.email,
      })

      // Check result register
      if (!created) {
        throw new Error("Có lỗi xảy ra, thử lại sau!!")
      }

      // Return the response
      res.status(201).json({
        message: "Tạo tài khoản thành công!",
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  // Login
  login: async (req, res) => {
    try {
      logger.info(`Login process start!`)
      // Get username and password from request body
      const username = req.body.username.toLowerCase()
      const password = req.body.password

      // Check if the username exists
      const user = await userService.getByUsername(username)
      if (!user) {
        return res.status(404).json({ message: "Tên đăng nhập chưa tồn tại!" })
      }
      // Check if the user is active
      if (user.status === "disable") {
        return res.status(403).json({ message: "Người dùng bị vô hiệu hóa!" })
      }
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(401).json({ message: "Mật khẩu không đúng!" })
      }

      // Payload
      const payload = {
        username: user.username,
        role: user.role,
      }
      logger.debug(`payload.username: ${user.username}`)
      logger.debug(`payload.role: ${user.role}`)
      // Generate JWT
      const accessToken = tokenService.generateAccessToken(payload)

      logger.debug(`authController.login ~ accessToken: ${accessToken}`)

      const refreshToken = tokenService.generateRefreshToken(payload)

      logger.debug(`authController.login ~ refreshToken: ${refreshToken}`)

      // Save refresh token to database
      const saveToken = await tokenService.updateUserRefreshToken(
        user.username,
        refreshToken
      )

      if (!saveToken) {
        return res.status(500).json({
          message: "Lỗi khi tạo token!",
        })
      }

      // // Set token to cookies
      // res.cookie("accessToken", accessToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "none",
      // })

      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "none",
      // })

      // Return the response
      res.status(200).json({
        user: {
          username: user.username,
          name: user.name,
          role: user.role,
          phone: user.phone,
          status: user.status,
          email: user.email,
        },
        accessToken,
        refreshToken,
      })
    } catch (error) {
      next(error)
    } finally {
      logger.info(`Login process end!`)
    }
  },
  // Refresh access token
  refreshAccessToken: async (req, res) => {
    try {
      // // Get refresh token
      // if (req?.cookies?.refreshToken) {
      //   logger.debug(`refreshTokenFromCookie: ${req.cookies.refreshToken}`)
      //   return res
      //     .status(200)
      //     .json({ refreshTokenFromCookie: req?.cookies?.refreshToken })
      // }
      // if (req?.body?.refreshToken) {
      //   logger.debug(`refreshTokenFromBody: ${req?.body?.refreshToken}`)
      //   return res
      //     .status(200)
      //     .json({ refreshTokenFromBody: req.body.refreshToken })
      // }

      const refreshToken = req?.body?.refreshToken
      if (!refreshToken) {
        return res.status(401).json({
          message: "You not have refresh token! Please log in again!",
        })
      }

      // Verify refresh token signature
      const payloadDecoded = await tokenService.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_KEY
      )

      if (!payloadDecoded) {
        return res
          .status(401)
          .json({ message: "The refresh token signature is invalid!" })
      }

      // Verify refresh token exits in database
      const user = await tokenService.checkRefreshToken(refreshToken)
      logger.info(`user: ${JSON.stringify(user, null, 2)}`)
      if (!user || user?.refreshToken !== refreshToken) {
        return res
          .status(401)
          .json({ message: "The refresh token is not valid!" })
      }

      // generate new payload
      const newPayload = {
        username: user.username,
        role: user.role,
      }

      // Generate new token
      const newAccessToken = tokenService.generateAccessToken(newPayload)
      const newRefreshToken = tokenService.generateRefreshToken(newPayload)

      // Save refresh token to database
      const saveToken = await tokenService.updateUserRefreshToken(
        user.username,
        newRefreshToken
      )
      if (!saveToken) {
        return res.status(500).json({
          message: "Error while saving refresh token to database!",
        })
      }

      // // Set token to cookies
      // res.cookie("accessToken", newAccessToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "none",
      // })
      // res.cookie("refreshToken", newRefreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "none",
      // })

      // Return the response
      res.status(200).json({
        message: "Refresh access token successfully!",
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      })
    } catch (error) {
      next(error)
    }
  },
  // Logout
  logout: async (req, res) => {
    try {
      logger.info(`Logout process start!`)
      // Clear refresh token in database
      const clearToken = await tokenService.updateUserRefreshToken(
        req.user.username,
        ""
      )
      if (!clearToken) {
        return res.status(500).json({
          message: "Lỗi khi tạo token!",
        })
      }
      res.status(200).json({
        message: "Đăng xuất thành công",
      })
      logger.info(`User ${req.user.username} logout success`)
    } catch (error) {
      next(error)
    } finally {
      logger.info(`Logout process end!`)
    }
  },
}

module.exports = authController
