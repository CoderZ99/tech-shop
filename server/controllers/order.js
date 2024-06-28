const product = require("../models/product")
const orderService = require("../services/order")
const {
  updateStock,
  updateSold,
  cancelSold,
  cancelStock,
} = require("../services/product")
const orderController = {
  createOrder: async (req, res) => {
    try {
      const order = req.body
      console.log(`🚀 ~ createOrder: ~ order:`, order)
      const newOrder = await orderService.createOrder(order)
      order.orderItems.forEach((product) => {
        updateStock(product.product, product.quantity)
        updateSold(product.product, product.quantity)
      })
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
  updateOrderStatus: async (req, res) => {
    try {
      const order = req.body
      console.log(`🚀 ~ updateOrderStatus: ~ req.body:`, req.body)
      console.log(`🚀 ~ updateOrderStatus: ~ order:`, order)
      const updatedOrder = await orderService.updateStatus(
        order.id,
        order.status
      )
      if (order.status === "cancelled") {
        order?.orderItems.forEach((product) => {
          console.log(`🚀 ~ updateOrderStatus: ~ product:`, product)
          cancelStock(product.product, product.quantity)
          cancelSold(product.product, product.quantity)
        })
      }
      console.log(`🚀 ~ updateOrderStatus: ~ updatedOrder:`, updatedOrder)
      res.status(200).json(updatedOrder)
    } catch (error) {
      console.log(`🚀 ~ updateOrderStatus: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },

  updatePayment: async (req, res) => {
    try {
      const order = req.body
      console.log(`🚀 ~ updateOrderPayment: ~ order:`, order)
      console.log(order.id)
      const updatedOrder = await orderService.updatePayment(
        order.id,
        order.isPaid
      )
      res.status(200).json(updatedOrder)
    } catch (error) {
      console.log(`🚀 ~ updateOrderPayment: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await orderService.getAll()
      console.log(`🚀 ~ fetchOrder: ~ result:`, result)
      res.status(200).json(result)
    } catch (error) {
      console.log(`🚀 ~ fetchOrder: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id
      console.log(`🚀 ~ fetchOrder: ~ id:`, id)
      const result = await orderService.getById(id)
      console.log(`🚀 ~ fetchOrder: ~ result:`, result)
      res.status(200).json(result)
    } catch (error) {
      console.log(`🚀 ~ fetchOrder: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = orderController
