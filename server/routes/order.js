const express = require("express")
const router = express.Router()

const orderController = require("../controllers/order")

router.get("/", orderController.getAll)

router.get("/:username", orderController.getAllByUsername)

router.put("/create", orderController.createOrder)

router.put("/update", orderController.updateOrderStatus)

module.exports = router
