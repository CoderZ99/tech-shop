const userService = require("../services/user")

const usersController = {
  /**
   * Retrieves a user by their username.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} - The user data if found, or a 404 error if not found.
   */
  getByUsername: async (req, res) => {
    try {
      const username = req.params.username.toLowerCase()

      // Call the service to get the user by username
      const data = await userService.getByUsername(username)

      // If the user is found, return the user data
      if (!data) {
        // If the user is not found, return a 404 error
        return res.status(404).json({
          message: "Không tìm thấy người dùng!",
          data,
        })
      }
      return res.status(200).json({
        message: "Thành công",
        error: 0,
        data,
      })
    } catch (error) {
      // Catch any error that occurs and return it to the client
      res.json({
        message: `error! ${error.message}`,
      })
    }
  },
  blockUser: async (req, res) => {
    try {
      const { username } = req.params
      const data = await userService.blockUser(username)
      if (!data) {
        return res.status(404).json({ message: "Không tìm thấy tài khoản" })
      }
      res.status(200).json({
        message: "Thành công",
      })
    } catch (error) {
      res.json({
        message: `error! ${error.message}`,
      })
    }
  },
  unblockUser: async (req, res) => {
    try {
      const { username } = req.params
      const data = await userService.unblockUser(username)
      if (!data) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" })
      }
      res.status(200).json({
        message: "Thành công",
        error: 0,
      })
    } catch (error) {
      res.json({
        message: `error! ${error.message}`,
        error: 1,
      })
    }
  },
  updateUser: async (req, res) => {
    try {
      console.log(`🚀 ~ updateUser: ~ req.body:`, req.body)
      console.log(`🚀 ~ updateUser: ~ req.params:`, req.params)
      const { username } = req.params
      console.log(`🚀 ~ updateUser: ~ username:`, username)
      const data = {
        name: req.body.name,
        phone: req.body.phone,
      }
      console.log(`🚀 ~ updateUser: ~ data:`, data)

      const result = await userService.updateUser(username, data)
      console.log(`🚀 ~ updateUser: ~ result:`, result)
      if (!result) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" })
      }
      res.status(200).json({
        message: "Cập nhật người dùng thành công",
        user: data,
      })
    } catch (error) {
      res.json({
        message: `error! ${error.message}`,
      })
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const data = await userService.getAllUsers()
      res.status(200).json({ data })
    } catch (error) {
      res.json({
        message: `error! ${error.message}`,
      })
    }
  },
}

module.exports = usersController
