import api from "./api"

const path = "/api/v1/order"

export const createOrder = async (order) => {
  try {
    const endpoint = `${path}/create`
    console.log(`🚀 ~ createOrder ~ order:`, order)
    const response = await api.put(endpoint, order)
    console.log(`🚀 ~ createOrder ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ createOrder ~ error:`, error.response.data)
    throw error.response.data
  }
}

export const fetchOrders = async (username) => {
  try {
    console.log(`🚀 ~ fetchOrders ~ username:`, username)
    const endpoint = `${path}/${username}`
    const response = await api.get(endpoint)
    console.log(`🚀 ~ fetchOrders ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ fetchOrders ~ error:`, error.response.data)
    throw error.response.data
  }
}
