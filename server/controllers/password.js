const passwordService = require("../services/password")

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
}

module.exports = passwordController
