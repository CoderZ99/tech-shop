const tokenService = require("../services/token")

const authMiddleware = {
  loginRequired: (req, res, next) => {
    // Get token from header
    const bearerToken = req.headers["authorization"]
    if (!bearerToken) {
      return res.status(401).json({ message: "Không được phép truy cập" })
    }
    // Split token
    const token = bearerToken.split(" ")[1]
    console.log(`bearerToken: ${bearerToken}`)
    console.log(`token: ${token}`)
    // Verify token
    const decoded = tokenService.verifyToken(token, process.env.JWT_ACCESS_KEY)
    if (!decoded) {
      return res.status(401).json({ message: "Token không hợp lệ" })
    }
    // Add user info from token to request
    req.user = decoded
    next()
  },
  verifyAdmin: (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Không được phép" })
    }
    next()
  },
}

module.exports = authMiddleware
