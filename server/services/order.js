const { logger } = require("../logger")

const Order = require("../models/order")

const orderService = {
  createOrder: async (order) => {
    const newOrder = new Order(order)
    return await newOrder.save()
  },
  getAllByUsername: async (username) => {
    return await Order.find({ username: username })
  },
  getAll: async (queryParams) => {
    const {
      page = 1,
      limit = 5,
      sort = "",
      search = "",
      status = "",
      paymentMethod = "",
      isPaid = "",
    } = queryParams
    logger.info(`orderService.getAll ~ queryParams:${queryParams}`)
    // Filter deleted orders by default
    let query = { isDeleted: false }
    // Search: search by name, brand, or category
    if (search) {
      query.$or = [{ username: { $regex: search, $options: "i" } }]
    }
    if (status) query.status = status
    if (paymentMethod) query.paymentMethod = paymentMethod
    if (isPaid) query.isPaid = isPaid

    const sortOptions = {}
    if (sort) {
      const [field, direction] = sort.split(":")
      sortOptions[field] = direction === "asc" ? 1 : -1
    } else {
      sortOptions["orderAt"] = -1
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOptions,
    }
    const orders = await Order.paginate(query, options)
    return { ...orders, query, options }
  },
  updateStatus: async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true })
  },

  updatePayment: async (id, isPaid) => {
    return await Order.findByIdAndUpdate(id, { isPaid }, { new: true })
  },

  getById: async (id) => {
    return await Order.findById(id)
  },

  deleteOrder: async (id) => {
    return await Order.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  },

  getRevenue: async () => {
    const revenue = await Order.aggregate([
      { $match: { isPaid: true, status: "delivered" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ])
    return revenue
  },
}

module.exports = orderService
