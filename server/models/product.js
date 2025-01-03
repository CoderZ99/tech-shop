const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    images: [
      {
        publicId: { type: String, default: "" },
        url: { type: String, default: "" },
      },
    ],
    isDeleted: { type: Boolean, default: false },
    slug: { type: String, default: "" },
    brand: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    sold: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Add plugin to paginate
productSchema.plugin(mongoosePaginate)
// Index for search by $regex
productSchema.index({ name: 1 })
productSchema.index({ brand: 1 })
productSchema.index({ category: 1 })
// Optimize filter on brand and category
productSchema.index({ brand: 1, category: 1 })
// Export model
module.exports = mongoose.model("Product", productSchema)
