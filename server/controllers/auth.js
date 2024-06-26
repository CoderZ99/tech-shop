const bcrypt = require("bcrypt")

const authService = require("../services/auth")
const userService = require("../services/user")
const tokenService = require("../services/token")

const authController = {
  // Register
  register: async (req, res) => {
    try {
      const username = req.body.username.toLowerCase()
      // Check if the username already exists
      let checkUsername = await userService.getByUsername(username)
      if (checkUsername) {
        return res.status(400).json({ message: "The username already exists!" })
      }

      // Hash the password
      const password = req.body.password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      console.log(`register password: ${password}`)
      console.log(`password-hashed: ${hashedPassword}`)

      // Other user info
      const name = req.body.name
      const role = req.body.role
      const phone = req.body.phone
      const status = req.body.status

      // Create the new user
      const createResult = await authService.register({
        username,
        password: hashedPassword,
        name,
        role,
        phone,
        status,
      })

      // Check result register
      if (!createResult) {
        return res.status(400).json({
          message:
            "There was an error creating the account, please try again.!",
        })
      }

      // Return the response
      res.status(201).json({
        message: "Account successfully created!",
      })
    } catch (error) {
      res.json({
        message: `Error: ${error.message}`,
      })
    }
  },
  // Login
  login: async (req, res) => {
    try {
      // Get username and password from request body
      const username = req.body.username.toLowerCase()
      const password = req.body.password

      // Check if the username exists
      const user = await userService.getByUsername(username)
      if (!user) {
        return res.status(404).json({ message: "The username does not exist!" })
      }
      // Check if the user is active
      if (user.status === "disable") {
        return res.status(401).json({ message: "The user is disabled!" })
      }
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(401).json({ message: "The password is incorrect!" })
      }

      // Payload
      const payload = {
        username: user.username,
        role: user.role,
      }
      console.table(payload)
      // Generate JWT
      const accessToken = tokenService.generateAccessToken(payload)

      console.log(`🚀 ~ file: auth.js:88 ~ login: ~ accessToken:`, accessToken)

      const refreshToken = tokenService.generateRefreshToken(payload)

      console.log(
        `🚀 ~ file: auth.js:94 ~ login: ~ refreshToken:`,
        refreshToken
      )

      // Save refresh token to database
      const saveToken = await tokenService.updateUserRefreshToken(
        user.username,
        refreshToken
      )

      if (!saveToken) {
        return res.status(500).json({
          message: "Error while saving refresh token to database!",
        })
      }

      // Return the response
      res.status(200).json({
        user: {
          username: user.username,
          name: user.name,
          role: user.role,
          phone: user.phone,
          status: user.status,
        },
        accessToken,
        refreshToken,
      })
    } catch (error) {
      res.json({
        message: `Error: ${error.message}`,
      })
    }
  },
  // Refresh access token
  refreshAccessToken: async (req, res) => {
    try {
      console.log(`refresh access token process`)
      // Get refresh token from cookies
      const refreshToken = req?.cookies?.refreshToken
      console.log(`refreshToken: ${refreshToken}`)
      if (!refreshToken) {
        return res.status(401).json({
          message:
            "The refresh token does not exist because you are not logged in!",
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
      console.log(`user: ${JSON.stringify(user, null, 2)}`)
      if (!user) {
        return res
          .status(401)
          .json({ message: "The refresh token is not exits in database!" })
      }

      // Verify refresh token is yours
      if (user.refresh_token !== refreshToken) {
        return res
          .status(401)
          .json({ message: "The refresh token is not yours!" })
      }

      // Payload
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

      // Set token to cookies
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })

      // Return the response
      res.status(200).json({
        message: "Refresh access token successfully!",
      })
    } catch (error) {
      res.json({
        message: `Error: ${error.message}`,
      })
    }
  },
  // Logout
  logout: async (req, res) => {
    try {
      console.log(`logout process`)
      // Clear refresh token in database
      const token = ""
      const clearToken = await tokenService.updateUserRefreshToken(
        req.user.username,
        token
      )
      if (!clearToken) {
        return res.status(500).json({
          message: "Error while saving refresh token to database!",
        })
      }
      res.status(200).json({
        message: "Logout successfully!",
      })
      console.log("Logout successfully!")
    } catch (error) {
      res.json({
        message: `Error: ${error.message}`,
      })
    }
  },
}

module.exports = authController
