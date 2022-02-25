import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

// ------------------------------------------------
// updateUserPasswordController
// ------------------------------------------------
const updateUserPasswordController = expressAsyncHandler(async (req, res) => {
  // destructure the logged in user
  const { _id } = req.user
  const { password } = req.body
  validateMongodbId(_id)
  // Find the user by _id
  const user = await User.findById(_id)

  if (password) {
    user.password = password
    const updatedUserPassword = await user.save()
    res.json(updatedUserPassword)
  }
  res.json(user)
})

export default updateUserPasswordController
