const Product = require("../models/product")
const { logger } = require("../logger")
const productService = {
  /**
   * Retrieves a paginated list of non-deleted products.
   *
   * @param {Object} queryParams - The query parameters for filtering and sorting the products.
   * @return {Promise<Array>} A Promise that resolves to an array of product objects.
   */
  getProducts: async (queryParams) => {
    const {
      page = 1,
      limit = 5,
      sort = "",
      search = "",
      category = "",
      minPrice = 0,
      maxPrice = 0,
      rating = 0,
      brand = "",
    } = queryParams

    // Filter deleted products by default
    let query = { isDeleted: false }

    // Search: search by name, brand, or category
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ]
    }

    // Filter
    if (category) query.category = category
    if (minPrice || maxPrice) query.price = {}
    if (minPrice) query.price.$gte = minPrice
    if (maxPrice) query.price.$lte = maxPrice
    if (rating) query.rating = { $gte: rating }
    if (brand) query.brand = brand

    // Pagination
    // Sort by createdAt in descending order by default
    // Example: sort=price:asc or sort=rating:desc
    const sortOptions = {}

    if (sort) {
      const [field, direction] = sort.split(":")
      sortOptions[field] = direction === "asc" ? 1 : -1
    } else {
      sortOptions["createdAt"] = -1
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOptions,
    }
    // Logger
    const products = await Product.paginate(query, options)
    return { ...products, query, options }
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
