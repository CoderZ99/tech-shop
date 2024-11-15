const express = require("express")
const router = express.Router()

const cloudinaryController = require("../controllers/cloudinary")

// use post method follow documentation of cloudinary
router.post(
  "/create-signature",
  cloudinaryController.createSignatureUploadImage
)

module.exports = router