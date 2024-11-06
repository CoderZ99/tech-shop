const userRouter = require("./user")
const authRouter = require("./auth")
const productRouter = require("./product")
const orderRouter = require("./order")
const cloudinaryRouter = require("./cloudinary")
// Require user login middleware
const { loginRequired } = require("../middlewares/auth")

function routes(app) {
  app.use("/api/v1/auth", authRouter)

  app.use("/api/v1/user", loginRequired, userRouter)

  app.use("/api/v1/product", productRouter)

  app.use("/api/v1/order", orderRouter)

  app.use("/api/v1/cloudinary", cloudinaryRouter)
}

module.exports = routes
