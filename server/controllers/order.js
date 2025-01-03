const { logger } = require("../logger")
const orderService = require("../services/order")
const {
  updateStock,
  updateSold,
  cancelSold,
  cancelStock,
} = require("../services/product")
const CO = "../utils/constant"
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
      throw new Error(error)
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
      throw new Error(error)
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const order = req.body
      logger.debug(`orderController.updateOrderStatus: ~ req.body:`, req.body)
      logger.debug(`orderController.updateOrderStatus: ~ order:`, order)

      // Check order is exist
      const existingOrder = await orderService.getById(order.id)
      if (!existingOrder) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" })
      }

      const updatedOrder = await orderService.updateStatus(
        order.id,
        order.status
      )

      logger.info(
        `orderController.updateOrderStatus: ~ updatedOrder:`,
        updatedOrder
      )

      // If order status is cancelled
      if (order.status === "cancelled") {
        order?.orderItems.forEach((product) => {
          logger.info(`orderController.updateOrderStatus: ~ product:`, product)
          cancelStock(product.product, product.quantity)
          cancelSold(product.product, product.quantity)
        })
      }

      res.status(200).json(updatedOrder)
    } catch (error) {
      logger.info(`orderController.updateOrderStatus: ~ error:`, error)
      throw new Error(error)
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
      throw new Error(error)
    }
  },

  getAll: async (req, res) => {
    try {
      const orders = await orderService.getAll(req.query)
      logger.info(`orderController.fetchOrder: ~ result:${orders}`)
      res.status(200).json({ orders })
    } catch (error) {
      logger.info(`orderController.fetchOrder: ~ error:`, error)
      throw new Error(error)
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
      throw new Error(error)
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const id = req.params.id
      logger.info(`orderController.deleteOrder: ~ id:`, id)
      const result = await orderService.deleteOrder(id)
      logger.info(`orderController.deleteOrder: ~ result:`, result)
      res.status(200).json(result)
    } catch (error) {
      logger.info(`orderController.deleteOrder: ~ error:`, error)
      throw new Error(error)
    }
  },

  getRevenue: async (req, res) => {
    try {
      const revenue = await orderService.getRevenue()
      logger.info(`orderController.getRevenue: ~ revenue${revenue}`)
      res.status(200).json(revenue)
    } catch (error) {
      logger.info(`orderController.getRevenue: ~ error:`, error)
      throw new Error(error)
    }
  },
}

module.exports = orderController
