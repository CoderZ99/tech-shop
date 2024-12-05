const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    receiver: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["placed", "processing", "shipping", "delivered", "cancelled"],
      default: "placed",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    orderAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Middleware
orderSchema.pre("save", function (next) {
  if (this.isPaid && !this.paidAt) {
    this.paidAt = Date.now()
  }
  next()
})

// Add plugin to paginate
orderSchema.plugin(mongoosePaginate)

// Export model
module.exports = mongoose.model("Order", orderSchema)
