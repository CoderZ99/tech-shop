import api from "./api"

// Auth endpoint
const path = "/api/v1/auth"

export const loginUser = async (userData) => {
  try {
    // Define endpoint
    const endpoint = `${path}/login`
    // Call API
    const response = await api.post(endpoint, userData)
    console.log(`🚀 ~ login ~ response:`, response)

    return response
  } catch (error) {
    console.log(`🚀 ~ register ~ error:`, error.response.data)
    throw error.response.data
  }
}

export const register = async (userData) => {
  console.log(`🚀 ~ register ~ userData:`, userData)
  try {
    // Define endpoint
    const endpoint = `${path}/register`
    // Call API
    const response = await api.post(endpoint, userData)
    console.log(`🚀 ~ register ~ response:`, response)

    // Return data
    return response
  } catch (error) {
    console.log(`🚀 ~ register ~ error:`, error.response.data)
    throw error.response.data
  }
}

export const logoutAdmin = async () => {
  const endpoint = `${path}/logout`
  const response = await api.post(endpoint)
  console.log(`🚀 ~ logout ~ response:`, response)
}

export const refreshToken = async () => {
  try {
    const endpoint = `${path}/refresh`
    const response = await api.post(endpoint)
    console.log(`🚀 ~ refreshToken ~ response:`, response)
    return response
  } catch (error) {
    console.log(`🚀 ~ refreshToken ~ error:`, error.response.data)
    throw error(error.response.data)
  }
}
