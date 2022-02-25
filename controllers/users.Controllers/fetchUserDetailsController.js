import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

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

export default fetchUserDetailsController
