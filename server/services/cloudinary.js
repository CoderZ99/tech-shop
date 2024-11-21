const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

/**
 * Generates a signed request for uploading an image to Cloudinary.
 *
 * This function creates a timestamp and generates a signature
 * using the Cloudinary API for secure image uploads.
 *
 * @return {Promise<Object>} A Promise that resolves to an object containing
 *   the timestamp and signature for the Cloudinary upload request.
 */
const cloudinaryService = {
  createSignature: async () => {
    // Get the current timestamp
    const timestamp = new Date().getTime()

    // Generate a signature for the upload request using Cloudinary's API
    const signature = await cloudinary.utils.api_sign_request(
      {
        timestamp,
        upload_preset: "upload_image_preset",
      },
      process.env.CLOUDINARY_SECRET
    )

    // Return the generated timestamp and signature
    return { timestamp, signature }
  },
  deleteImage: async (publicId) => {
    console.log(`🚀 ~ cloudinaryService.deleteImage ~ publicId:`, publicId)
    return await cloudinary.v2.uploader.destroy(publicId)
  },
}

module.exports = cloudinaryService
