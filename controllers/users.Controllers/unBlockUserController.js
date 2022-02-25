import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

// -----------------------------------------------------------------------------------
// unBlock user
// -----------------------------------------------------------------------------------
const unBlockUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongodbId(id)

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  )
  res.send(user)
})

export default unBlockUserController
