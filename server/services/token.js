const jwt = require("jsonwebtoken")

const User = require("../models/user")

/**
 * Generates a JSON Web Token (JWT) access token using the provided payload.
 *
 * @param {object} payload - The payload to be encoded in the access token.
 * @return {string} The generated access token.
 */
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
  })
}

/**
 * Generates a JSON Web Token (JWT) refresh token using the provided payload.
 *
 * @param {object} payload - The payload to be encoded in the refresh token.
 * @return {string} The generated refresh token.
 */
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

/**
 * Checks if a refresh token is valid by finding a user with the matching token in the database.
 *
 * @param {string} token - The refresh token to check.
 * @return {Promise<Object|null>} A Promise that resolves to the user object if the token is valid, or null if it is not found.
 */
async function checkRefreshToken(token) {
  return await User.findOne({ refreshToken: token })
}

/**
 * Updates the refresh token for a user in the database.
 *
 * @param {string} username - The username of the user.
 * @param {string} refreshToken - The new refresh token to be updated.
 * @return {Promise<Object|null>} A Promise that resolves to the updated user object if successful, or null if the user is not found.
 */
async function updateUserRefreshToken(username, refreshToken) {
  return await User.findOneAndUpdate(
    { username },
    { refreshToken: refreshToken },
    { new: true }
  )
}

async function checkVerifyToken(token) {
  return await User.findOne({ verifyToken: token })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  checkRefreshToken,
  updateUserRefreshToken,
  checkVerifyToken,
}
