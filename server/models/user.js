const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    name: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    status: { type: String, enum: ["active", "disable"], default: "active" },
    refreshToken: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: "" },
    resetPasswordExpires: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String, default: "" },
  },
  { timestamps: true }
)

// Add plugin to paginate
userSchema.plugin(mongoosePaginate)
// Define index
userSchema.index({ username: 1 })

// Create and export model from schema
module.exports = mongoose.model("User", userSchema)
