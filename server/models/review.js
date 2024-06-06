const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please provide rating"],
      default: 0,
    },
    comments: {
      type: String,
      required: [true, "Please provide comment"],
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Preview", reviewSchema)
