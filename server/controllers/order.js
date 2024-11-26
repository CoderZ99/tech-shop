const { logger } = require("../logger")
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
      logger.debug(`orderController.createOrder: ~ order:`, order)
      const newOrder = await orderService.createOrder(order)
      order.orderItems.forEach((product) => {
        updateStock(product.product, product.quantity)
        updateSold(product.product, product.quantity)
      })
      logger.info(`orderController.createOrder: ~ newOrder:`, newOrder)
      res.status(201).json(newOrder)
    } catch (error) {
      logger.info(`orderController.createOrder: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },
  getAllByUsername: async (req, res) => {
    try {
      const username = req.params.username
      logger.info(`orderController.getAllByUserName: ~ username:`, username)
      const orders = await orderService.getAllByUsername(username)
      logger.info(`orderController.getAllByUserName: ~ orders:`, orders)
      res.status(200).json(orders)
    } catch (error) {
      logger.info(`orderController.getAllByUserName: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const order = req.body
      logger.debug(`orderController.updateOrderStatus: ~ req.body:`, req.body)
      logger.debug(`orderController.updateOrderStatus: ~ order:`, order)
      const updatedOrder = await orderService.updateStatus(
        order.id,
        order.status
      )
      if (order.status === "cancelled") {
        order?.orderItems.forEach((product) => {
          logger.info(`orderController.updateOrderStatus: ~ product:`, product)
          cancelStock(product.product, product.quantity)
          cancelSold(product.product, product.quantity)
        })
      }
      logger.info(
        `orderController.updateOrderStatus: ~ updatedOrder:`,
        updatedOrder
      )
      res.status(200).json(updatedOrder)
    } catch (error) {
      logger.info(`orderController.updateOrderStatus: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },

  updatePayment: async (req, res) => {
    try {
      const order = req.body
      logger.debug(`orderController.updateOrderPayment: ~ order:`, order)
      logger.info(order.id)
      const updatedOrder = await orderService.updatePayment(
        order.id,
        order.isPaid
      )
      res.status(200).json(updatedOrder)
    } catch (error) {
      logger.info(`orderController.updateOrderPayment: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await orderService.getAll()
      logger.info(`orderController.fetchOrder: ~ result:`, result)
      res.status(200).json(result)
    } catch (error) {
      logger.info(`orderController.fetchOrder: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id
      logger.info(`orderController.fetchOrder: ~ id:`, id)
      const result = await orderService.getById(id)
      logger.info(`orderController.fetchOrder: ~ result:`, result)
      res.status(200).json(result)
    } catch (error) {
      logger.info(`orderController.fetchOrder: ~ error:`, error)
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = orderController
