const userRouter = require("./user")
const authRouter = require("./auth")
const productRouter = require("./product")
const orderRouter = require("./order")
const cloudinaryRouter = require("./cloudinary")
const reviewRouter = require("./review")
// Require user login middleware
const { loginRequired } = require("../middlewares/auth")
const errorHandler = require("../middlewares/errorHandler")

function routes(app) {
  app.use("/api/v1/auth", authRouter)

  app.use("/api/v1/user", loginRequired, userRouter)

  app.use("/api/v1/product", productRouter)

  app.use("/api/v1/order", orderRouter)

  app.use("/api/v1/cloudinary", cloudinaryRouter)

  app.use("/api/v1/review", reviewRouter)
  // Error handler middleware should be last
  app.use(errorHandler)
}

module.exports = routes
