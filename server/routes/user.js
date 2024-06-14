const express = require("express")
const router = express.Router()

const userController = require("../controllers/user")

// Check role admin middleware
const { verifyAdmin } = require("../middlewares/auth")

router.get("/get-all", userController.getAllUsers)

router.get("/:username", userController.getByUsername)

router.put("/block/:username", verifyAdmin, userController.blockUser)

router.put("/unblock/:username", verifyAdmin, userController.unblockUser)

router.put("/update/:username", userController.updateUser)

module.exports = router
