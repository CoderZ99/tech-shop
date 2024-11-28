const { logger } = require("../logger")
const productService = require("../services/product")
const reviewService = require("../services/review")

const reviewsController = {
  getProductReviews: async (req, res) => {
    try {
      const { productId } = req.params
      if (!productId) {
        return res
          .status(400)
          .json({ message: `Không tìm thấy productId: ${productId}` })
      }
      logger.info(`reviewsController.getProductReviews ~ productId:`, productId)
      // Validate productId
      const validProduct = await productService.getOne(productId)
      if (!validProduct) {
        return res.status(400).json({ message: "Không tìm thấy sản phẩm" })
      }

      // Lấy đánh giá và populate thông tin user
      const reviews = await reviewService.getProductReviews(productId)

      res.status(200).json(reviews)
    } catch (error) {
      console.error("Error in getProductReviews:", error)
      res.status(500).json({ message: "Lỗi server" })
    }
  },

  // Tạo đánh giá mới
  createProductReview: async (req, res) => {
    try {
      const { productId } = req.params
      logger.debug(`createProductReview ~ productId: ${req.params.id}`)
      const { rating, comment, fullName } = req.body
      const username = req.user.username // from middleware auth
      logger.info(
        `reviewsController.createProductReview ~ fullName: ${fullName}`
      )
      // Validate input
      if (!rating) {
        return res
          .status(400)
          .json({ message: "Vui lòng chọn số sao đánh giá" })
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Đánh giá phải từ 1 đến 5 sao" })
      }

      // Validate productId
      const validProduct = await productService.getOne(productId)
      if (!validProduct) {
        return res.status(400).json({ message: "Không tìm thấy sản phẩm" })
      }

      // // Kiểm tra xem người dùng đã đánh giá sản phẩm này chưa
      // const existingReview = await reviewService.findReviewByUsername(
      //   username,
      //   productId
      // )
      // if (existingReview) {
      //   return res
      //     .status(400)
      //     .json({ message: "Bạn đã đánh giá sản phẩm này rồi" })
      // }

      // Tạo đánh giá mới
      const review = await reviewService.createProductReview(
        productId,
        username,
        fullName,
        rating,
        comment
      )

      if (!review) {
        return res.status(500).json({ message: "Lỗi khi tạo đánh giá" })
      }

      res.status(201).json({ message: "Đánh giá sản phẩm thành công" })
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = reviewsController
