const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/review")
const { loginRequired } = require("../middlewares/auth")

router.get("/user", loginRequired, reviewController.findReviewByUsername)

router.get("/product/:productId", reviewController.getProductReviews)

router.post("/product/:productId", loginRequired, reviewController.createReview)

router.put("/update/:reviewId", loginRequired, reviewController.updateReview)

router.delete("/delete/:reviewId", loginRequired, reviewController.deleteReview)

module.exports = router
