const User = require("../models/user")

const userService = {
  // Get all undeleted users
  getAllUsers: async () => {
    return await User.find({role:"user" , isDeleted: false})
  },
  getByUsername: async (username) => {
    return await User.findOne({ username: username })
  },
  blockUser: async (username) => {
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
    return await User.findOneAndUpdate({ username: username },{isDeleted: true}, { new: true })
  },
}

module.exports = userService
