const express = require("express")
const router = express.Router()

const productsController = require("../controllers/product")

router.get("/", productsController.getAll)

router.get("/:id", productsController.getOne)

router.get("/detail/:detailUrl", productsController.getByDetailUrl)

module.exports = router
