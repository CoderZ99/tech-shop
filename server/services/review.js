const Review = require("../models/review")
const Product = require("../models/product")
const { logger } = require("../logger")
const reviewService = {
  createReview: async (product, user, fullName, rating, comment) => {
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
    return await Review.find({ product: productId, isDeleted: false }).sort({
      createdAt: -1,
    })
  },
  updateReview: async (reviewId, rating, comment) => {
    const review = await Review.findById(reviewId)
    if (!review) {
      throw new Error("Review not found")
    }
    review.rating = rating
    review.comment = comment
    return await review.save()
  },
  getReviewById: async (reviewId) => {
    const review = await Review.findById(reviewId)
    if (!review) {
      throw new Error("Review not found")
    }
    return review
  },

  deleteReview: async (reviewId) => {
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
  // findReviewByUsername: async (username, productId) => {
  //   return await Review.findOne({ user: username, product: productId })
  // },
  findReviewByUsername: async (username) => {
    // return await Review.find({ user: username })
    return await Review.find({ user: username, isDeleted: false })
      .sort({
        createdAt: -1,
      })
      .populate({ path: "product", select: "_id name slug" })
  },

  updateProductRating: async (productId, rating) => {
    const product = await Product.findById(productId)
    if (!product) {
      throw new Error("Product not found")
    }
    product.rating = Number.parseFloat(rating).toFixed(1)
    return await product.save()
  },
  updateProductReviewCount: async (productId, reviews) => {
    const product = await Product.findById(productId)
    if (!product) {
      throw new Error("Product not found")
    }
    product.numReviews = reviews
    return await product.save()
  },
}

module.exports = reviewService
