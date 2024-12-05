import api from "./api"

// Auth endpoint
const path = "/api/v1/user"

export const fetchUsers = async () => {
  try {
    const endpoint = `${path}/`
    const response = await api.get(endpoint)
    console.log(`🚀 ~ fetchUsers ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ fetchUsers ~ error:`, error.response.data)
    throw error.response.data
  }
}

export const blockUser = async (username) => {
  try {
    const endpoint = `${path}/block/${username}`
    const response = await api.put(endpoint)
    console.log(`🚀 ~ blockUser ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ blockUser ~ error:`, error.response.data)
    throw error.response.data
  }
}

export const unblockUser = async (username) => {
  try {
    const endpoint = `${path}/unblock/${username}`
    const response = await api.put(endpoint)
    console.log(`🚀 ~ unblockUser ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ unblockUser ~ error:`, error.response.data)
    throw error.response.data
  }
}

export const deleteUser = async (username) => {
  try {
    const endpoint = `${path}/delete/${username}`
    const response = await api.delete(endpoint)
    console.log(`🚀 ~ deleteUser ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ deleteUser ~ error:`, error.response.data)
    throw error.response.data
  }
}
