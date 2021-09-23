const User = require('../../model/user/User')

// -------------------------------
// Register
// -------------------------------
const userRegisterController = async (req, res) => {
  console.log(req.body)
  try {
    // Register User
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.secondName,
      email: req?.body?.email,
      password: req?.body?.password,
    })
    res.json('user controller')
  } catch (error) {
    res.json(error)
  }
}

module.exports = { userRegisterController }
