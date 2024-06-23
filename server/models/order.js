const mongoose = require("mongoose")

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
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["placed", "shipping", "delivered", "cancelled"],
      default: "placed",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    orderAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

// Export model
module.exports = mongoose.model("Order", orderSchema)
