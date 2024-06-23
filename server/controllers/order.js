const orderService = require("../services/order")

const orderController = {
  createOrder: async (req, res) => {
    try {
      const order = req.body
      console.log(`🚀 ~ createOrder: ~ order:`, order)
      const newOrder = await orderService.createOrder(order)
      console.log(`🚀 ~ createOrder: ~ newOrder:`, newOrder)
      res.status(201).json(newOrder)
    } catch (error) {
      console.log(`🚀 ~ createOrder: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },
  getAllByUsername: async (req, res) => {
    try {
      const username = req.params.username
      console.log(`🚀 ~ getAllByUserName: ~ username:`, username)
      const orders = await orderService.getAllByUsername(username)
      console.log(`🚀 ~ getAllByUserName: ~ orders:`, orders)
      res.status(200).json(orders)
    } catch (error) {
      console.log(`🚀 ~ getAllByUserName: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = orderController
