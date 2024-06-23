import api from "./api"

// Auth endpoint
const path = "/api/v1/user"

export const updateUserProfile = async (username, userData) => {
  console.log(`🚀 ~ updateUserProfile ~ userData:`, userData)
  try {
    const endpoint = `${path}/update/${username}`
    const response = await api.put(endpoint, userData)
    console.log(`🚀 ~ updateUserProfile ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ updateUserProfile ~ error:`, error)
    throw error?.response?.data
  }
}
