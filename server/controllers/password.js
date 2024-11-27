const passwordService = require("../services/password")
const User = require("../models/user")
const userService = require("../services/user")
const tokenService = require("../services/token")
const bcrypt = require("bcrypt")
const { validatePassword } = require("../utils/validation")
const { logger } = require("../logger")

const passwordController = {
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body

      // Validate email
      if (!email || !email.includes("@")) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp email hợp lệ",
        })
      }

      const result = await passwordService.forgotPassword(email)
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { token, newPassword } = req.body

      // Validate input
      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp đầy đủ thông tin",
        })
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu phải có ít nhất 6 ký tự",
        })
      }

      const result = await passwordService.resetPassword(token, newPassword)
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body
      const username = req.user.username
      logger.info(`🚀 ~ changePassword: ~ username: ${username}`)

      // Validate input
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password and new password are required",
        })
      }

      // // Validate new password format
      // if (!validatePassword(newPassword)) {
      //   return res.status(400).json({
      //     success: false,
      //     message:
      //       "New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      //   })
      // }

      // Find user
      const user = await userService.getByUsername(username)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy tài khoản",
        })
      }

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu hiện tại không đúng!",
        })
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)

      // Update password
      const result = await passwordService.changePassword(
        user.username,
        hashedPassword
      )

      res.status(200).json({
        success: true,
        message: "Cập nhật mật khẩu thành công!",
      })
    } catch (error) {
      logger.error("Change password error:", error)
      throw error(error)
    }
  },
}

module.exports = passwordController
