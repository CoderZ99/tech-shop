const express = require("express")
const router = express.Router()

const orderController = require("../controllers/order")

router.get("/", orderController.getAll)

router.get("/:id", orderController.getById)

router.get("/user/:username", orderController.getAllByUsername)

router.put("/create", orderController.createOrder)

router.put("/update", orderController.updateOrderStatus)

router.put("/payment", orderController.updatePayment)

router.delete("/:id", orderController.deleteOrder)

module.exports = router
