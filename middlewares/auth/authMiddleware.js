const expressAsyncHandler = require('express-async-handler')

const jwt = require('jsonwebtoken')
const User = require('../../model/user/User')

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // find the user by id
        const user = await User.findById(decoded?.id).select('-password')
        // console.log('user =>', user)
        // attach the user to the request object
        // console.log(user)
        req.user = user
        next()
      }
    } catch (error) {
      throw new Error('Not authorized, token expired, login again')
    }
  } else {
    throw new Error('There is no token attached to the header')
  }
})

module.exports = authMiddleware
