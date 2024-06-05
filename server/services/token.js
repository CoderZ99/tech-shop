const jwt = require("jsonwebtoken")

const User = require("../models/users")

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
  })
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
  })
}

/**
 * Verifies a JSON Web Token using the provided key.
 *
 * @param {string} token - The JSON Web Token to verify.
 * @param {string} key - The key used to verify the token.
 * @return {Promise<object>} A promise that resolves to the decoded token payload if the token is valid, or rejects with an error if the token is invalid.
 */
function verifyToken(token, key) {
  return jwt.verify(token, key)
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
}
