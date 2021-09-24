const User = require('../../model/user/User')

// -------------------------------
// Register
// -------------------------------
const userRegisterController = async (req, res) => {
  // check if user EXISTS already
  const userExist = await User.findOne({ email: req?.body?.email })
  if (userExist) throw new Error('User already exists')

  // console.log(req?.body)
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
}

module.exports = { userRegisterController }
