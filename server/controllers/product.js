const productService = require("../services/product")
const { logger } = require("../logger")
const productsController = {
  // Get all products
  getProducts: async (req, res) => {
    // Default page and limit
    const defaultPage = 1
    const defaultLimit = 5

    // Get page and limit
    const page = parseInt(req.query.page) || defaultPage
    const limit = parseInt(req.query.limit) || defaultLimit

    // Get products
    try {
      const products = await productService.getPaginatedProducts(page, limit)
      logger.info(`productsController.getAll ~ products:`, products)
      // Send response
      res.status(200).json({ products })
    } catch (error) {
      logger.error(`productsController.getProducts ~ error: ${error}`)
      throw new Error(error)
    }
  },

  // Get one product
  getProduct: async (req, res) => {
    try {
      // Get product id
      const productId = req.params.id
      logger.debug(`productsController.getProduct ~ productId: ${productId}`)
      const product = await productService.getOne(productId)
      if (!product) {
        throw new Error("Không tìm thấy sản phẩm")
      }
      res.status(200).json(product)
    } catch (error) {
      throw new Error(error)
    }
  },

  // Get one by detail url
  getBySlug: async (req, res) => {
    try {
      // Get product by detail url
      const slug = req?.params?.slug
      const product = await productService.getBySlug(slug)
      logger.info(`productsController.getBySlug ~ product:`, product)
      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" })
      }
      res.status(200).json(product)
    } catch (error) {
      logger.error(`productsController.getBySlug ~ error:`, error)
      throw new Error(error)
    }
  },

  // Add new product
  add: async (req, res) => {
    try {
      const product = req.body
      logger.info(`productsController.add ~ product:`, product)
      if (product?._id) {
        delete product._id
      }
      const newProduct = productService.add(product)
      res.status(201).json(newProduct)
    } catch (error) {
      throw new Error(error)
    }
  },

  // Update product
  update: async (req, res) => {
    try {
      // Debug
      logger.debug(`🚀 ~ update: ~ req.params:`, req.params.id)
      logger.debug(`🚀 ~ update: ~ req.body:`, req.body)
      // Get product id
      const productId = req.params.id
      const product = req.body
      const updatedProduct = productService.update(productId, product)
      res.status(200).json(updatedProduct)
    } catch (error) {
      throw new Error(error)
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id
      const deletedProduct = productService.delete(productId)
      res.status(200).json(deletedProduct)
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = productsController
