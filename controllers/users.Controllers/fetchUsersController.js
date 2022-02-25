import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'
// -------------------------------------------------------------------
//  Users
// -------------------------------------------------------------------
const fetchUsersController = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers)
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})

export default fetchUsersController
