const mongoose = require("mongoose")

const reviewSchema = require("./review")

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    imageUrl: { type: String, default: "" },
    detailUrl: { type: String, default: "" },
    brand: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    price: {
      type: String,
      required: [true, "Please provide product price"],
    },
    sold: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Review",
      },
    ],
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Export model
module.exports = mongoose.model("Product", productSchema)
