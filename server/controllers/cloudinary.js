const cloudinaryService = require("../services/cloudinary")

const cloudinaryController = {
  createSignatureUploadImage: async (req, res) => {
    try {
      const { timestamp, signature } = await cloudinaryService.createSignature()

      console.log({ timestamp, signature })

      res.status(200).json({ timestamp: timestamp, signature: signature })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = cloudinaryController
