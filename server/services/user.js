const { logger } = require("../logger")
const User = require("../models/user")

const userService = {
  // Get all undeleted users
  getAllUsers: async (queryParams) => {
    logger.info(`userService.getAllUsers ~ queryParams:${queryParams}`)
    const {
      page = 1,
      limit = 5,
      sort = "",
      search = "",
      status = "",
    } = queryParams
    // Filter deleted users by default
    let query = { role: "user", isDeleted: false }
    // Search: search by name, brand, or category
    if (search) {
      query.$or = [{ username: { $regex: search, $options: "i" } }]
    }
    if (status) query.status = status
    const sortOptions = {}
    if (sort) {
      const [field, direction] = sort.split(":")
      sortOptions[field] = direction === "asc" ? 1 : -1
    } else {
      sortOptions["createdAt"] = -1
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOptions,
    }

    const users = await User.paginate(query, options)
    return { ...users, query, options }
  },
  getByUsername: async (username) => {
    return await User.findOne({ username: username })
  },
  blockUser: async (username) => {
    logger.info(`userService.blockUser ~ username:${username}`)
    return await User.findOneAndUpdate(
      { username: username },
      { status: "disable" },
      { new: true }
    )
  },
  unblockUser: async (username) => {
    return await User.findOneAndUpdate(
      { username: username },
      { status: "active" },
      { new: true }
    )
  },
  /**
   * Updates user data by username
   */
  updateUser: async (username, data) => {
    return await User.findOneAndUpdate({ username: username }, data, {
      new: true,
    })
  },
  // Delete user by setting isDeleted to true
  deleteUser: async (username) => {
    return await User.findOneAndUpdate(
      { username: username },
      { isDeleted: true },
      { new: true }
    )
  },
}

module.exports = userService
