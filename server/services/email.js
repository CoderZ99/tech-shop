const nodemailer = require("nodemailer")
const { logger } = require("../logger")

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  }

  async sendPasswordReset(email, resetURL) {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Đặt lại mật khẩu iTech Shop",
      html: `
        <h1>Yêu cầu đặt lại mật khẩu</h1>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản iTech Shop của mình.</p>
        <p>Vui lòng nhấp vào liên kết bên dưới để đặt lại mật khẩu:</p>
        <a href="${resetURL}" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        ">Đặt lại mật khẩu</a>
        <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <p>Trân trọng,<br>Tech Shop Team</p>
      `,
    }
    try {
      await this.transporter.sendMail(mailOptions)
    } catch (err) {
      throw new Error(`Không thể gửi email reset mật khẩu: ${err.message}`)
    }
  }

  async sendVerifyMail(email, verificationUrl) {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Xác thực đăng ký tài khoản iTech Shop của bạn",
      html: `<p>Vui lòng nhấp vào liên kết bên dưới để kích hoạt tài khoản của bạn:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>`,
    }
    try {
      await this.transporter.sendMail(mailOptions)
    } catch (err) {
      logger.error(`sendVerifyMail ~ err: ${err}`)
      throw new Error(`Không thể gửi mail xác thực tài khoản: ${err.message}`)
    }
  }
}

module.exports = new EmailService()
