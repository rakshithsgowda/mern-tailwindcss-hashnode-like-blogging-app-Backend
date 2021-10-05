const express = require('express')
const {
  userRegisterController,
  loginUserController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateUserController,
  updateUserPasswordController,
  followingUserController,
} = require('../../controllers/users/usersController')

const authMiddleware = require('../../middlewares/auth/authMiddleware')

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)
userRoutes.post('/login', loginUserController)
userRoutes.get('/', authMiddleware, fetchUsersController)
userRoutes.get('/profile/:id', authMiddleware, userProfileController)
userRoutes.put('/:id', authMiddleware, updateUserController)
userRoutes.put('/follow', authMiddleware, followingUserController)
userRoutes.put('/password', authMiddleware, updateUserPasswordController)
userRoutes.delete('/:id', deleteUserController)
userRoutes.get('/:id', fetchUserDetailsController)

module.exports = userRoutes
