const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    image: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    detailUrl: { type: String, default: "" },
    brand: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    sold: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Export model
module.exports = mongoose.model("Product", productSchema)
