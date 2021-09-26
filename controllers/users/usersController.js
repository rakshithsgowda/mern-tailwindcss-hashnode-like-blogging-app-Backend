const expressAsyncHandler = require('express-async-handler')
const User = require('../../model/user/User')

// -------------------------------
// Register
// -------------------------------
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

module.exports = { userRegisterController }
