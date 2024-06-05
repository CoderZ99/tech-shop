const User = require("../models/users")

const userService = {
  getAllUsers: async () => {
    return await User.find()
  },
  getByUsername: async (username) => {
    return await User.findOne({ username: username })
  },
  blockUser: async (username) => {
    return await User.findOneAndUpdate(
      { username: username },
      { status: "disable" }
    )
  },
  unblockUser: async (username) => {
    return await User.findOneAndUpdate(
      { username: username },
      { status: "active" }
    )
  },
  updateUser: async (username, data) => {
    return await User.findOneAndUpdate({ username: username }, data)
  },
}

module.exports = userService
