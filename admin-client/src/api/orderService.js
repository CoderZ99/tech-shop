import api from "./api"

// order endpoint
const path = "/api/v1/order"

export const updateOrderStatus = async (orderId, orderItems, status) => {
  try {
    console.log(`updateOrderStatus.orderId:`, orderId)
    console.log(`updateOrderStatus.orderItems:`, orderItems)
    console.log(`updateOrderStatus.status:`, status)
    const endpoint = `${path}/update`
    const response = await api.put(endpoint, {
      id: orderId,
      status: status,
      orderItems: orderItems,
    })
    console.log(`updateOrderStatus.response:`, response)
    return response
  } catch (error) {
    console.log(`updateOrderStatus.error:`, error.response.data)
    throw error.response.data
  }
}

export const fetchOrders = async () => {
  try {
    const endpoint = `${path}/`
    const response = await api.get(endpoint)
    console.log(`🚀 ~ fetchOrders ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ fetchOrders ~ error:`, error.response.data)
    throw error.response.data
  }
}

export const deleteOrder = async (orderId) => {
  try {
    const endpoint = `${path}/${orderId}`
    const response = await api.delete(endpoint)
    console.log(`🚀 ~ deleteOrder ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ deleteOrder ~ error:`, error.response.data)
    throw error.response.data
  }
}
