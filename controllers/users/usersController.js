const expressAsyncHandler = require('express-async-handler')
const User = require('../../model/user/User')

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
  // cheking if yuser exists
  const user = await User.findOne({ email: req?.body?.email })
  if (!user) {
    throw new Error(`Login credentials not valid`)
  }
  res.json('user login')
})

module.exports = { userRegisterController, loginUserController }
