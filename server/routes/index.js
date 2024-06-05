const userRouter = require("./user")
const authRouter = require("./auth")

// Require user login middleware
const { loginRequired } = require("../middlewares/auth")

function routes(app) {
  app.use("/api/v1/auth", authRouter)

  app.use("/api/v1/users", loginRequired, userRouter)
}

module.exports = routes
