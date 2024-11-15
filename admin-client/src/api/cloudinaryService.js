import api from "./api"

// Auth endpoint
const path = "/api/v1/cloudinary"

// get signature from backend
const getSignature = async () => {
  try {
    // Define endpoint
    const endpoint = `${path}/create-signature`
    // Call API
    const response = await api.post(endpoint)
    console.table(`🚀 ~ getSignature ~ response:`, response)

    return response
  } catch (error) {
    console.log(`🚀 ~ getSignature ~ error:`, error)
    throw error.response.data
  }
}

export const uploadProductImage = async (images) => {
  console.log(`🚀 ~ uploadProductImage ~ images:`, images)
  try {
    // Get signature from backend
    const signatureResponse = await getSignature()
    const { signature, timestamp } = signatureResponse.data
    // Send image to cloudinary
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME
    const cloudApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
    // Create form data to upload image
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("signature", signature)
        formData.append("api_key", cloudApiKey)
        formData.append("timestamp", timestamp)
        formData.append("upload_preset", "upload_image_preset")

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        )
        return await res.json()
      })
    )
    console.log(`🚀 ~ uploadProductImage ~ uploadedImages:`, uploadedImages)
    return uploadedImages
  } catch (error) {
    throw new Error("Upload image to cloudinary fail")
  }
}

export const destroyProductImage = async (imageIds) => {
  console.log(`🚀 ~ destroyProductImage ~ imageIds:`, imageIds)
  try {
    // Get signature from backend
    const signatureResponse = await getSignature()
    const { signature, timestamp } = signatureResponse.data
    // Send image to cloudinary
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME
    const cloudApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
    // Create form data to upload image
    const destroyedIds = await Promise.all(
      imageIds.map(async (id) => {
        const formData = new FormData()
        formData.append("public_id", id)
        formData.append("signature", signature)
        formData.append("api_key", cloudApiKey)
        formData.append("timestamp", timestamp)
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
          {
            method: "POST",
            body: formData,
          }
        )
        return await res.json()
      })
    )
    return destroyedIds
  } catch (error) {
    throw new Error("Destroy image on cloudinary fail")
  }
}
