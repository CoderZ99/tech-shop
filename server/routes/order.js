const express = require("express")
const router = express.Router()

const orderController = require("../controllers/order")

router.get("/:username", orderController.getAllByUsername)

router.put("/create", orderController.createOrder)

module.exports = router
