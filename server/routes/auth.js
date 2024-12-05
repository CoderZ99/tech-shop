const express = require("express")
const router = express.Router()

const authController = require("../controllers/auth")

const passwordController = require("../controllers/password")

const { loginRequired } = require("../middlewares/auth")

router.post("/register", authController.register)

router.post("/login", authController.login)

router.post("/refresh", authController.refreshAccessToken)

router.post("/logout", loginRequired, authController.logout)

router.post("/forgot", passwordController.forgotPassword)

router.post("/reset", passwordController.resetPassword)

router.post("/change-password", loginRequired, passwordController.changePassword)

module.exports = router
