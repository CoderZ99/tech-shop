const Order = require("../models/order")

const orderService = {
  createOrder: async (order) => {
    const newOrder = new Order(order)
    return await newOrder.save()
  },
  getAllByUsername: async (username) => {
    return await Order.find({ username: username })
  },
  getAll: async () => {
    return await Order.find({ isDeleted: false })
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
}

module.exports = orderService
