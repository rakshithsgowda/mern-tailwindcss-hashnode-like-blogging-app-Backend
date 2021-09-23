const mongoose = require('mongoose')

// create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, 'Fist name is required'],
      type: 'String',
    },
    lastName: {
      required: [true, 'Fist name is required'],
      type: 'String',
    },
    profilePhoto: {
      type: 'String',
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['Admin', 'Guest', 'Blogger'],
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: {
      type: String,
    },
    accountVerificationTokenExpires: {
      type: Date,
    },
    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    passwordChangeAt: {
      type: Date,
    },
    passwordRessetToken: {
      type: String,
    },
    passwordRessetExpires: {
      type: Date,
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
    timestamps: true,
  }
)

// compile schema into model

const User = mongoose.model('User', userSchema)

module.exports = User
