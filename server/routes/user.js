const express = require('express')
const router = express.Router()

const userController = require('../controllers/users')

router.get('/get-all', userController.getAllUsers)

router.get('/:username', userController.getByUsername)

router.post('/register', userController.createUser)

router.post('/block/:username', userController.blockUser)

router.post('/unblock/:username', userController.unblockUser)

router.put('/update/:username', userController.updateUser)

module.exports = router;