import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

// -----------------------------------------------------------
// update user profile
// -----------------------------------------------------------
const updateUserController = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user
  validateMongodbId(_id)

  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req.body?.lastName,
      email: req?.body?.email,
      bio: req?.user?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.json(user)
})

export default updateUserController
