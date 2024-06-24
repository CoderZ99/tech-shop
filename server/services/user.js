const User = require("../models/user")

const userService = {
  getAllUsers: async () => {
    return await User.find({role:"user"})
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
  updateUser: async (username, data) => {
    return await User.findOneAndUpdate({ username: username }, data, {
      new: true,
    })
  },
}

module.exports = userService
