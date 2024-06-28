import api from "./api"

// order endpoint
const path = "/api/v1/order"

export const cancelOrder = async (orderId, orderItems) => {
  try {
    const endpoint = `${path}/update`
    const response = await api.put(endpoint, {
      id: orderId,
      status: "cancelled",
      orderItems: orderItems,
    })
    console.log(`🚀 ~ cancelOrder ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ cancelOrder ~ error:`, error.response.data)
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

export const restoreOrder = async (orderId) => {
  console.log(`🚀 ~ restoreOrder ~ orderId:`, orderId)
}
