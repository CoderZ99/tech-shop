const userService = require("../services/user");

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
      const username = req.params.username.toLowerCase();

      // Call the service to get the user by username
      const data = await userService.getByUsername(username);

      // If the user is found, return the user data
      if (!data) {
        // If the user is not found, return a 404 error
        return res.status(404).json({
          message: "not found user!",
          error: 1,
          data,
        });
      }
      return res.status(200).json({
        message: "success",
        error: 0,
        data,
      });
    } catch (error) {
      // Catch any error that occurs and return it to the client
      res.json({
        message: `error! ${error.message}`,
        error: 1,
      });
    }
  },
  /**
   * Create a new user.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<Object>} - The response object with a status code and message.
   */
  // createUser: async (req, res) => {
  //   try {
  //     const { username, password, full_name, role, phone, status } = req.body;

  //     // Check if the username already exists
  //     let checkUsername = await userService.getByUsername(username);
  //     if (checkUsername) {
  //       return res
  //         .status(400)
  //         .json({ message: "username already exists!", error: 1 });
  //     }
  //     // Create the new user
  //     await userService.createUser({
  //       username,
  //       password,
  //       full_name,
  //       role,
  //       phone,
  //       status,
  //     });

  //     // Return the response
  //     res.status(201).json({
  //       message: "success",
  //       error: 0,
  //     });
  //   } catch (error) {
  //     res.json({
  //       message: `error! ${error.message}`,
  //       error: 1,
  //     });
  //   }
  // },
  /**
   * Blocks a user by their username.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} - The response object with a status code and message.
   */
  blockUser: async (req, res) => {
    try {
      const { username } = req.params;
      const data = await userService.blockUser(username);
      if (!data) {
        return res.status(404).json({ message: "user not found!", error: 1 });
      }
      res.status(200).json({
        message: "success",
        error: 0,
      });
    } catch (error) {
      res.json({
        message: `error! ${error.message}`,
        error: 1,
      });
    }
  },
  /**
   * Unblocks a user by their username.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<Object>} - The response object with a status code and message.
   */
  unblockUser: async (req, res) => {
    try {
      const { username } = req.params;
      const data = await userService.unblockUser(username);
      if (!data) {
        return res.status(404).json({ message: "user not found!", error: 1 });
      }
      res.status(200).json({
        message: "success",
        error: 0,
      });
    } catch (error) {
      res.json({
        message: `error! ${error.message}`,
        error: 1,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { username } = req.params;
      const { full_name, phone } = req.body;
      const data = {
        full_name: full_name,
        phone: phone,
      };
      console.log(username);
      const result = await userService.updateUser(username, data);
      if (!result) {
        return res.status(404).json({ message: "user not found!", error: 1 });
      }
      res.status(200).json({
        message: "success",
        error: 0,
      });
    } catch (error) {
      res.json({
        message: `error! ${error.message}`,
        error: 1,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const data = await userService.getAllUsers();
      if (!data) {
        return res.status(404).json({ message: "user not found!", error: 1 });
      }

      res.status(200).json({
        message: "success",
        data: data,
        error: 0,
      });
    } catch (error) {
      res.json({
        message: `error! ${error.message}`,
        error: 1,
      });
    }
  },
};

module.exports = usersController;
