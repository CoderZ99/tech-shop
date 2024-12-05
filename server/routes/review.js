const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/review")
const { loginRequired } = require("../middlewares/auth")

router.get("/product/:productId", reviewController.getProductReviews)

router.post(
  "/product/:productId",
  loginRequired,
  reviewController.createProductReview
)

// router.delete('/:reviewId', loginRequired, reviewController.deleteReview);

module.exports = router
