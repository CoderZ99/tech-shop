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
    return await Order.find()
  },
  updateStatus: async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true })
  },
}

module.exports = orderService
