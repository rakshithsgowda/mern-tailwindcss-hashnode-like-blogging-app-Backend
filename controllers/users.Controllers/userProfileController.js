import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

// -----------------------------------------------------------------------------------
// User profile
// -----------------------------------------------------------------------------------
const userProfileController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongodbId(id)
  try {
    const myProfile = await User.findById(id)
    res.json(myProfile)
  } catch (error) {
    res.json(error)
  }
})

export default userProfileController
