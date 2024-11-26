const { logger } = require("../logger")
const cloudinaryService = require("../services/cloudinary")

const cloudinaryController = {
  createSignatureUploadImage: async (req, res) => {
    try {
      const { timestamp, signature } = await cloudinaryService.createSignature()

      logger.debug({ timestamp, signature })

      res.status(200).json({ timestamp: timestamp, signature: signature })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  deleteImage: async (req, res) => {
    try {
      const publicId = req?.body?.publicId
      logger.info(`deleteImage ~ publicId:`, publicId)
      const result = await cloudinaryService.deleteImage(publicId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = cloudinaryController
