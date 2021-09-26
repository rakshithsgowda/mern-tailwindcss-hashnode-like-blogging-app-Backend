const express = require('express')
const {
  userRegisterController,
  loginUserController,
} = require('../../controllers/users/usersController')

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)
userRoutes.post('/login', loginUserController)

module.exports = userRoutes
