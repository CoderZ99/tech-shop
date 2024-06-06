const mongoose = require("mongoose")

const reviewSchema = require("./review")

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    image: { type: String, default: "" },
    brand: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    count_in_stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [reviewSchema],
    num_reviews: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Export model
module.exports = mongoose.model("Product", productSchema)
