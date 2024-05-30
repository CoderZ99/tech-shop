const express = require('express')
const router = express.Router()

const userController = require('../controllers/users.controller')

router.get('/:username', userController.getByUsername)

router.post('/register', userController.createUser)

module.exports = router;