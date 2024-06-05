const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  full_name: { type: String, default: "" },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: { type: String, default: "" },
  status: { type: String, enum: ["active", "disable"], default: "active" },
  refresh_token: { type: String, default: "" },
})

// Define index
userSchema.index({ username: 1 }, { unique: true })

// Create and export model from schema
module.exports = mongoose.model("User", userSchema)
