import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

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

export default followingUserController
