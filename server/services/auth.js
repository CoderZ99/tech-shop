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
  }) => {
    const newUser = new User({
      username,
      password,
      name,
      role,
      phone,
      status,
      email,
    })
    return await newUser.save()
  },
}

module.exports = authService
