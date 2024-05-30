const User = require('../models/users.model')

const userService = {
    getByUsername: async(username) => {
        return await User.findOne({username: username})
    },
    create: async({username, passwword, role, phone, status}) => {
        const newUser = new User({username, passwword, role, phone, status})
        return await newUser.save()
    },
}

module.exports = userService