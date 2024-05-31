const authController = {
    // Register
    register: async (req, res) => {
        try {
            const { username, password } = req.body
            const checkUsername = await userService.getByUsername(username)
            if (checkUsername) {
                return res.status(400).json({ message: 'username already exists!', error: 1 })
            }
            const newUser = await userService.createUser({ username, password })
            if (!newUser) {
                return res.status(400).json({ message: 'create user failed!', error: 1 })
            }
            return res.status(201).json({ message: 'success', error: 0 })
        } catch (error) {
            return res.json({ message: `error! ${error.message}`, error: 1 })
        }
    }
}
module.exports = authController