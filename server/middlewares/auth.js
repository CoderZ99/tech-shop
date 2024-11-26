const { logger } = require("../logger")
const tokenService = require("../services/token")

const authMiddleware = {
  loginRequired: async (req, res, next) => {
    try {
      // Get token from header
      const bearerToken = req.headers["authorization"]
      if (!bearerToken) {
        return res.status(401).json({ message: "Không được phép truy cập" })
      }
      // Split token
      const tokenParts = bearerToken.split(" ")
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Token không hợp lệ" })
      }
      const token = tokenParts[1]
      logger.debug(`bearerToken: ${bearerToken}`)
      logger.debug(`token: ${token}`)
      // Verify token
      const decoded = await tokenService.verifyToken(
        token,
        process.env.JWT_ACCESS_KEY
      )

      if (!decoded) {
        return res.status(401).json({ message: "Token không hợp lệ" })
      }

      // Add user info from token to request
      req.user = decoded
      next()
    } catch (error) {
      // Handle expired token
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token hết hạn" })
      } else {
        next(error)
      }
    }
  },
  verifyAdmin: (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Không được phép" })
    }
    next()
  },
}

module.exports = authMiddleware
