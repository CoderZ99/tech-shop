const Product = require("../models/product")

const productService = {
  /**
   * Retrieves all products from the database.
   *
   * @return {Promise<Array<Product>>} An array of products.
   */
  getAll: async () => {
    const products = await Product.find({ isDeleted: false })
    console.log(`🚀 ~ getAll: ~ products:`, products)
    return products
  },
  /**
   * Retrieves a single product from the database based on its ID.
   *
   * @param {string} id - The ID of the product to retrieve.
   * @return {Promise<Object|null>} A Promise that resolves to the retrieved product object, or null if no product is found.
   */
  getOne: async (id) => {
    const product = await Product.findById(id)
    return product
  },
  //
  getByDetailUrl: async (detailUrl) => {
    const product = await Product.findOne({ detailUrl })
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

  delete: async (id, product) => {
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
}

module.exports = productService
