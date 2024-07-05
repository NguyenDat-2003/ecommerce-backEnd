import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    role: {
      type: String,
      default: 'user'
    },

    cart: {
      type: Array,
      default: []
    },
    address: {
      type: String
    },
    refreshToken: {
      type: String
    },
    _destroy: {
      type: Boolean,
      default: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true
  }
)

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  // I need to specify a time to expire this token. In this example is (10 min)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

//Export the model
const User = mongoose.model('User', userSchema)
export default User
