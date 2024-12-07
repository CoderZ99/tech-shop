const { logger } = require("../logger")

module.exports = errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err}`)
  logger.error(`Error stack: ${err.stack}`)

  const messageError = err.messageObject || err.message

  // create format error response
  const statusCode = err.status || 400

  const error = {
    code: statusCode,
    status: "Error",
    message: messageError,
  }

  return res.status(statusCode).json(error)
}
