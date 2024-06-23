const User = require("../models/user")

const authService = {
  register: async ({ username, password, name, role, phone, status }) => {
    const newUser = new User({
      username,
      password,
      name,
      role,
      phone,
      status,
    })
    return await newUser.save()
  },
}

module.exports = authService
