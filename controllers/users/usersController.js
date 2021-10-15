const expressAsyncHandler = require('express-async-handler')
const generateToken = require('../../config/token/generateToken')
const User = require('../../model/user/User')
const validateMongodbId = require('../../utils/validateMongodbID')

// ------------------------------------------------------------------------------------------
// Register
// ------------------------------------------------------------------------------------------
const userRegisterController = expressAsyncHandler(async (req, res) => {
  // check if user EXISTS already
  const userExist = await User.findOne({ email: req?.body?.email })

  if (userExist) throw new Error('User already exists')
  try {
    // Register User
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    })
    res.json(user)
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    })
  }
})

// -----------------------------------------------------------------------------------
//  Login User
// -----------------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------------
//  Users
// -----------------------------------------------------------------------------------
const fetchUsersController = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers)
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})

// -----------------------------------------------------------------------------------
// Delete user
// -----------------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------------
// update user profile
// -----------------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------------
// update user password
// -----------------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------------
// following-user contorller
// -----------------------------------------------------------------------------------
const followingUserController = expressAsyncHandler(async (req, res) => {
  // find the user you want to follow and update its followers field property
  // 2. Update the login user following field
  // console.log(req.body)

  const { followId } = req.body
  const loginUserId = req.user._id

  // const the target user and check if the login ID exists
  const targetUser = await User.findById(followId)
  // console.log(targetUser)

  const alreadyFollowing = targetUser?.follower?.find(
    (user) => user?.toString() === loginUserId.toString()
  )
  if (alreadyFollowing) throw new Error('You have already followed this user')
  // console.log(alreadyFollowing)

  // 1. Find the user you want to follow and update it's followers field.
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    {
      new: true,
    }
  )

  // 2. Update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  )

  res.json({
    status: 200,
    message: ' this is a response from following user controller',
  })
})

// -----------------------------------------------------------------------------------
// unfollow-user controller
// -----------------------------------------------------------------------------------
const UnfollowUserController = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body
  const loginUserId = req.user.id

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    {
      new: true,
    }
  ),
    await User.findByIdAndUpdate(
      loginUserId,
      {
        $pull: { following: unFollowId },
      },
      { new: true }
    ),
    res.json('You have successfully unfollowed')
})

// -----------------------------------------------------------------------------------
module.exports = {
  userRegisterController,
  loginUserController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateUserController,
  updateUserPasswordController,
  followingUserController,
  UnfollowUserController,
}
