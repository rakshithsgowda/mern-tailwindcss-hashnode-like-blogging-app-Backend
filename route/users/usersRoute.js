const express = require('express')
const {
  userRegisterController,
} = require('../../controllers/users/usersController')

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)

module.exports = userRoutes
