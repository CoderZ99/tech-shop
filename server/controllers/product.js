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

  // Get one by detail url
  getBySlug: async (req, res) => {
    try {
      // Get product by detail url
      const slug = req?.params?.slug
      const product = await productService.getBySlug(slug)
      console.log(`🚀 ~ getByDetailUrl: ~ product:`, product)
      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" })
      }
      res.status(200).json(product)
    } catch (error) {
      console.log(`🚀 ~ getByDetailUrl: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },

  // Add new product
  add: async (req, res) => {
    try {
      const product = req.body
      console.log(`🚀 ~ add: ~ product:`, product)
      if (product?._id) {
        delete product._id
      }
      const newProduct = productService.add(product)
      res.status(201).json(newProduct)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Update product
  update: async (req, res) => {
    try {
      // Debug
      console.log(`🚀 ~ update: ~ req.params:`, req.params.id)
      console.log(`🚀 ~ update: ~ req.body:`, req.body)
      // Get product id
      const productId = req.params.id
      const product = req.body
      const updatedProduct = productService.update(productId, product)
      res.status(200).json(updatedProduct)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id
      const deletedProduct = productService.delete(productId)
      res.status(200).json(deletedProduct)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = productsController
