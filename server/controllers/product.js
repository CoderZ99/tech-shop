const productService = require("../services/product")

const productsController = {
  // Get all products
  getAll: async (req, res) => {
    try {
      const products = await productService.getAll()
      console.log(`🚀 ~ getAll: ~ products:`, products)

      res.status(200).json({ products })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Get one product
  getOne: async (req, res) => {
    try {
      // Get product id
      const productId = req.params.id
      const product = productService.getOne(productId)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Add new product
  add: async (req, res) => {
    try {
      const product = req.body
      const newProduct = productService.add(product)
      res.status(201).json(newProduct)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = productsController
