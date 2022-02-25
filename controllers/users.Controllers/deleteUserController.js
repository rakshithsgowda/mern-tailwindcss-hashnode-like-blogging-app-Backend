import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

// -----------------------------------------------------------
// Delete user
// -------------------------------------------------------
const deleteUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  // if (!id) throw new Error(`Please provide the proper user ID`)
  // res.send('delete user controller')
  validateMongodbId(id)
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    res.json(deletedUser)
  } catch (error) {
    res.json(error)
  }
})

export default deleteUserController
