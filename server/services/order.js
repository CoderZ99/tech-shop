const Order = require("../models/order")
const { update } = require("./product")

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

  updatePayment: async (id, isPaid) => {
    return await Order.findByIdAndUpdate(id, { isPaid}, { new: true })
  },

  getById: async (id) => {
    return await Order.findById(id)
  },
}

module.exports = orderService
