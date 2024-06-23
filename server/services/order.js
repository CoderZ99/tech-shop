const Order = require("../models/order")

const orderService = {
  createOrder: async (order) => {
    const newOrder = new Order(order)
    return await newOrder.save()
  },
  getAllByUsername: async (username) => {
    return await Order.find({ username: username })
  },
}

module.exports = orderService
