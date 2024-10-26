const cloudinary = require("cloudinary")

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
  createSignedRequest: async () => {
    // Get the current timestamp
    const timestamp = new Date().getTime()

    // Generate a signature for the upload request using Cloudinary's API
    const signature = await cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      process.env.CLOUDINARY_SECRET
    )

    // Return the generated timestamp and signature
    return { timestamp, signature }
  },
}

module.exports = cloudinaryService
