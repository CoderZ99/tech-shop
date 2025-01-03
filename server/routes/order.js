const express = require("express")
const router = express.Router()

const orderController = require("../controllers/order")

// Check role admin middleware
const { verifyAdmin } = require("../middlewares/auth")

router.get("/", orderController.getAll)

router.get("/revenue", orderController.getRevenue)

router.get("/:id", orderController.getById)

router.get("/user/:username", orderController.getAllByUsername)

router.put("/create", orderController.createOrder)

router.put("/update", orderController.updateOrderStatus)

router.put("/payment", orderController.updatePayment)

router.delete("/:id", orderController.deleteOrder)

module.exports = router
