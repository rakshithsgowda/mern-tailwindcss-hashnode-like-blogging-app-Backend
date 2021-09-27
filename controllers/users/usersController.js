const expressAsyncHandler = require('express-async-handler')
const generateToken = require('../../config/token/generateToken')
const User = require('../../model/user/User')
const validateMongodbId = require('../../utils/validateMongodbID')

// ------------------------------------------------------------------------------------------
// Register
// ------------------------------------------------------------------------------------------
const userRegisterController = expressAsyncHandler(async (req, res) => {
  // check if user EXISTS already
  const userExist = await User.findOne({ email: req?.body?.email })

  if (userExist) throw new Error('User already exists')
  try {
    // Register User
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    })
    res.json(user)
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    })
  }
})

// -----------------------------------------------------------------------------------
//  Login User
// -----------------------------------------------------------------------------------
const loginUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  // cheking if user exists
  const userFound = await User.findOne({ email })

  // check if the passwords is a match
  if (userFound && (await userFound.isPasswordsMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    })
  } else {
    res.status(401)
    throw new Error(`Invalid Login credentials`)
  }
})

// -----------------------------------------------------------------------------------
//  Users
// -----------------------------------------------------------------------------------
const fetchUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})

// -----------------------------------------------------------------------------------
// Delete user
// -----------------------------------------------------------------------------------
const deleteUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  // if (!id) throw new Error(`Please provide the proper user ID`)
  // res.send('delete user controller')
  validateMongodbId(id)
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    res.json(deletedUser)
  } catch (error) {
    res.json(error)
  }
})

// -----------------------------------------------------------------------------------
// user details
// -----------------------------------------------------------------------------------

const fetchUserDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  // check if user id is valid
  validateMongodbId(id)
  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})

module.exports = {
  userRegisterController,
  loginUserController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
}
