const User = require('../models/users')

const authService = {
    register: async({username, password, full_name, role, phone, status}) => {
        const newUser = new User({username, password, full_name, role, phone, status})
        return await newUser.save()
    }
}


module.exports = authService