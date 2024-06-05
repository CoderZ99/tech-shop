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
        return res
          .status(400)
          .json({ message: "The username already exists!", error: 1 })
      }

      // Hash the password
      const password = req.body.password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      console.log(`register password: ${password}`)
      console.log(`password-hashed: ${hashedPassword}`)

      // Other user info
      const full_name = req.body.full_name
      const role = req.body.role
      const phone = req.body.phone
      const status = req.body.status

      // Create the new user
      const createResult = await authService.register({
        username,
        password: hashedPassword,
        full_name,
        role,
        phone,
        status,
      })

      // Check result register
      if (!createResult) {
        return res.status(400).json({
          message:
            "There was an error creating the account, please try again.!",
          error: 1,
        })
      }

      // Return the response
      res.status(201).json({
        message: "Account successfully created!",
        error: 0,
      })
    } catch (error) {
      res.json({
        message: `Error: ${error.message}`,
        error: 1,
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
        return res
          .status(404)
          .json({ message: "The username does not exist!", error: 1 })
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "The password is incorrect!", error: 1 })
      }

      // Payload
      const payload = {
        username: user.username,
        role: user.role,
      }
      console.table(payload)
      // Generate JWT
      const accessToken = await tokenService.generateAccessToken(payload)
      const refreshToken = await tokenService.generateRefreshToken(payload)
      console.log(`accessToken: ${accessToken}`)
      console.log(`refreshToken: ${refreshToken}`)

      // Add access toke to cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })

      // Add refresh token to cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })

      //TODO: Add refresh token to database

      // Return the response
      res.status(200).json({
        message: "Login successfully!",
      })
    } catch (error) {
      res.json({
        message: `Error: ${error.message}`,
      })
    }
  },
}

module.exports = authController
