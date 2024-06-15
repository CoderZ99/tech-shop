const express = require("express")
const router = express.Router()

const productsController = require("../controllers/product")

router.get("/", productsController.getAll)

router.get("/:id", productsController.getOne)

module.exports = router
