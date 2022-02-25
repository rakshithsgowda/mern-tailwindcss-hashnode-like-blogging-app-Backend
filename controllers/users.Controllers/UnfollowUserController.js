import expressAsyncHandler from 'express-async-handler'
import generateToken from '../../config/token/generateToken.js'
import User from '../../model/user/User.js'
import validateMongodbId from '../../utils/validateMongodbID.js'

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

export default UnfollowUserController
