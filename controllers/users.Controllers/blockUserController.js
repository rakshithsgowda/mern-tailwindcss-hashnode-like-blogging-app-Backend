import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

// -----------------------------------------------------------------------------------
// block user
// -----------------------------------------------------------------------------------
const blockUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongodbId(id)

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  )
  res.send(user)
})

export default blockUserController
