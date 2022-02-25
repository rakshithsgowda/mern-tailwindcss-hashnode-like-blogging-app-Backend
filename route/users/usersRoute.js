import express from 'express'
import {
  userRegisterController,
  loginUserController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateUserController,
  updateUserPasswordController,
  followingUserController,
  UnfollowUserController,
  blockUserController,
  unBlockUserController,
} from '../../controllers/users.Controllers/index.js'

import authMiddleware from '../../middlewares/auth/authMiddleware.js'

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)
userRoutes.post('/login', loginUserController)
userRoutes.get('/', authMiddleware, fetchUsersController)
userRoutes.get('/profile/:id', authMiddleware, userProfileController)
userRoutes.put('/:id', authMiddleware, updateUserController)
userRoutes.put('/follow', authMiddleware, followingUserController)
userRoutes.put('/unfollow', authMiddleware, UnfollowUserController)
userRoutes.put('/block-user/:id', authMiddleware, blockUserController)
userRoutes.put('/unblock-user/:id', authMiddleware, unBlockUserController)
userRoutes.put('/password', authMiddleware, updateUserPasswordController)
userRoutes.delete('/:id', authMiddleware, deleteUserController)
userRoutes.get('/:id', authMiddleware, fetchUserDetailsController)

export default userRoutes
