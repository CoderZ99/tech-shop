const userRouter = require("./user")
const authRouter = require("./auth")
const productRouter = require("./product")
// Require user login middleware
const { loginRequired } = require("../middlewares/auth")

function routes(app) {
  app.use("/api/v1/auth", authRouter)

  app.use("/api/v1/user", loginRequired, userRouter)

  app.use("/api/v1/product", productRouter)
}

module.exports = routes
