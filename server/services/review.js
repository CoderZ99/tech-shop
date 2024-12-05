const Review = require("../models/review")
const { logger } = require("../logger")
const reviewService = {
  createProductReview: async (product, user, fullName, rating, comment) => {
    const review = new Review({
      product: product,
      user: user,
      fullName: fullName,
      rating: rating,
      comment: comment,
    })
    return await review.save()
  },
  getProductReviews: async (productId) => {
    return await Review.find({ product: productId }).sort({
      createdAt: -1,
    })
  },
  updateProductReview: async (reviewId, rating, comment) => {
    const review = await Review.findById(reviewId)
    if (!review) {
      throw new Error("Review not found")
    }
    review.rating = rating
    review.comment = comment
    return await review.save()
  },
  deleteProductReview: async (reviewId) => {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { isDeleted: true },
      { new: true }
    )
    if (!review) {
      throw new Error("Review not found")
    }
    return review
  },
  findReviewByUsername: async (username, productId) => {
    return await Review.findOne({ user: username, product: productId })
  },
}

module.exports = reviewService
