const { logger } = require("../logger")

// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  logger.error("System error:")
  console.error(err.stack)
  // Default error code is 500
  res.status(500).json({ message: err.message })
}
