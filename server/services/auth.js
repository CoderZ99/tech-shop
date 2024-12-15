const User = require("../models/user")

const authService = {
  register: async ({
    username,
    password,
    name,
    role,
    phone,
    status,
    email,
    verifyToken,
  }) => {
    const newUser = new User({
      username,
      password,
      name,
      role,
      phone,
      status,
      email,
      verifyToken,
    })
    return await newUser.save()
  },
}

module.exports = authService
