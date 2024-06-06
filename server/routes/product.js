const express = require("express")
const router = express.Router()

const productsController = require("../controllers/product")

router.get("/get-all", productsController.getAllProducts)

router.get("/get-one/:id", productsController.getOneProduct)

module.exports = router
