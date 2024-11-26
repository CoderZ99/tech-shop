const express = require("express")
const router = express.Router()

const productsController = require("../controllers/product")

router.get("/", productsController.getAll)

router.get("/:id", productsController.getOne)

router.get("/detail/:slug", productsController.getBySlug)

router.put("/:id", productsController.update)

router.delete("/:id", productsController.deleteProduct)

router.post("/create", productsController.add)

module.exports = router
