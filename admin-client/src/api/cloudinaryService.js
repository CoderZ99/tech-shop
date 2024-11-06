import api from "./api"

// Auth endpoint
const path = "/api/v1/cloudinary"

// get signature from backend
export const getSignature = async () => {
  try {
    // Define endpoint
    const endpoint = `${path}/create-signature`
    // Call API
    const response = await api.post(endpoint)
    console.log(`🚀 ~ getSignature ~ response:`, response)

    return response
  } catch (error) {
    console.log(`🚀 ~ getSignature ~ error:`, error)
    throw error.response.data
  }
}
