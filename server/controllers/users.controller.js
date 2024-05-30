const mongoose = require("mongoose")
const userService = require("../services/user.service")

const usersController = {
    getByUsername: async(req, res) => {
        try {
            const { username } = req.params
            const data = await userService.getByUsername(username)
            if (data) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                    
                })
            } else {
                return res.status(404).json({
                    message: 'not found user!',
                    error: 1,
                    data
                })
            }
        } catch (error) {
            res.json({
                message: `error! ${error.message}`,
                error: 1,
            })
        }
    },
    createUser: async(req, res) => {
        try {
            console.log(req.body)
            const { username, password, phone, status } = req.body

            // let checkUsername = await userService.getByUsername(username)
            // if (checkUsername) return res.status(400).json({ message: 'username đã tồn tại!', error: 1 })

            await userService.create({username, password, phone, status})

            res.status(201).json({
                message: 'success',
                error: 0,
            })
        } catch (error) {
            res.json({
                message: `error! ${error.message}`,
                error: 1,
            })
        }
    }
}

module.exports = usersController