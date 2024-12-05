const User = require("../models/user")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const emailService = require("./email")
const { logger } = require("../logger")
const { changePassword } = require("../controllers/password")

const passwordService = {
  forgotPassword: async (email) => {
    try {
      // Tìm user với email
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error("Không tìm thấy tài khoản với email này")
      }

      // Tạo token reset password
      const resetToken = crypto.randomBytes(32).toString("hex")
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

      // Lưu token và thời gian hết hạn vào DB
      user.resetPasswordToken = hashedToken
      user.resetPasswordExpires = Date.now() + 3600000 // 1 giờ
      await user.save()

      // Gửi email reset password
      const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`
      logger.debug(`resetURL: ${resetURL}`)
      await emailService.sendPasswordReset(user.email, resetURL)

      return {
        success: true,
        message: "Email đặt lại mật khẩu đã được gửi",
      }
    } catch (err) {
      throw new Error("Có lỗi khi gửi email đặt lại mật khẩu: " + err.message)
    }
  },
  resetPassword: async (token, newPassword) => {
    try {
      // Hash token từ params
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

      // Tìm user với token hợp lệ và chưa hết hạn
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      })

      if (!user) {
        throw new Error("Token không hợp lệ hoặc đã hết hạn")
      }

      // Hash mật khẩu mới và cập nhật
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword, salt)

      // Xóa token reset
      user.resetPasswordToken = ""
      user.resetPasswordExpires = null

      await user.save()

      return {
        success: true,
        message: "Mật khẩu đã được đặt lại thành công",
      }
    } catch (err) {
      throw new Error("Có lỗi khi đặt lại mật khẩu: " + err.message)
    }
  },
  changePassword: async (username, userPassword) => {
    return await User.findOneAndUpdate(
      { username },
      { password: userPassword },
      { new: true }
    )
  },
}

module.exports = passwordService
