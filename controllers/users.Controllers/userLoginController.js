import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

// ------------------------------------------------
// loginUserController
// ------------------------------------------------

const loginUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  // cheking if user exists
  const userFound = await User.findOne({ email })

  // check if the passwords is a match
  if (userFound && (await userFound.isPasswordsMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    })
  } else {
    res.status(401)
    throw new Error(`Invalid Login credentials`)
  }
})

export default loginUserController
