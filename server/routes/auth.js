const express = require("express")
const router = express.Router()

const authController = require("../controllers/auth")

const { loginRequired } = require("../middlewares/auth")

router.post("/register", authController.register)

router.post("/login", authController.login)

router.post("/refresh", authController.refreshAccessToken)

router.post("/logout", loginRequired, authController.logout)

module.exports = router
