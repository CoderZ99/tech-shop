const Product = require("../models/product")
const { logger } = require("../logger")
const productService = {
  /**
   * Retrieves a paginated list of non-deleted products.
   *
   * @param {Object} options - An object containing pagination options.
   * @return {Promise<Array>} A Promise that resolves to an array of product objects.
   */
  getProducts: async (options) => {
    const products = await Product.paginate({ isDeleted: false }, options)
    logger.info(`getAll ~ products:`, products)
    return products
  },
  /**
   * Retrieves a product based on ID.
   *
   * @param {string} id - The ID of the product to retrieve.
   * @return {Promise<Object|null>} A Promise that resolves to the retrieved product object, or null if no product is found.
   */
  getOne: async (id) => {
    const product = await Product.findById(id)
    logger.info(`getOne ~ product: ${product}`)
    return product
  },
  //
  getBySlug: async (slug) => {
    const product = await Product.findOne({ slug })
    return product
  },
  /**
   * Adds a new product to the database.
   *
   * @param {Object} product - The product object to be added.
   * @return {Promise<Object>} - A promise that resolves to the saved product object.
   */
  add: async (product) => {
    const newProduct = new Product(product)
    return await newProduct.save()
  },
  update: async (id, product) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    })
    return updatedProduct
  },

  delete: async (id) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true } },
      { new: true }
    )
    return updatedProduct
  },

  updateStock: async (id, quantity) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $inc: { stock: -quantity } },
      { new: true }
    )
    return updatedProduct
  },

  updateSold: async (id, quantity) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $inc: { sold: quantity } },
      { new: true }
    )
    return updatedProduct
  },

  cancelStock: async (id, quantity) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $inc: { stock: quantity } },
      { new: true }
    )
    return updatedProduct
  },

  cancelSold: async (id, quantity) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $inc: { sold: -quantity } },
      { new: true }
    )
    return updatedProduct
  },
}

module.exports = productService
