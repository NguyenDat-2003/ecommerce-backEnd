/* eslint-disable no-useless-catch */
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { sendEmail } from '~/utils/sendEmail'

const signup = async (reqBody) => {
  try {
    // Xử lý logic tùy dự án
    const newUser = {
      ...reqBody,
      password: await bcrypt.hash(reqBody.password, 12)
    }
    return await User.create(newUser)
  } catch (error) {
    throw error
  }
}

const login = async (reqBody) => {
  try {
    const { email, password } = reqBody

    if (!email || !password) {
      throw new Error('email pass require')
    }

    const user = await User.findOne({ email })
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Incorrect email!')
    }
    const matchUser = await bcrypt.compare(password, user.password)
    if (matchUser) {
      return user
    } else {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Incorrect password!')
    }
  } catch (error) {
    throw error
  }
}

const forgotPassword = async (req) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Email not found!')
  try {
    const token = await user.createPasswordResetToken()
    await user.save()
    const resetURL = `Hi, Please copy this link to reset Your Password. This link is valid till 10 minutes from now. ${token}`
    const data = {
      to: email,
      text: 'Hey User',
      subject: 'Forgot Password Link',
      htm: resetURL
    }
    sendEmail(data)
  } catch (error) {
    throw error
  }
}

const resetPassword = async (token, reqBody) => {
  const { password } = reqBody

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  })
  if (!user) throw new Error(' Token Expired, Please try again later')
  user.password = await bcrypt.hash(password, 12)
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()
  return user
}
export const authService = { login, signup, forgotPassword, resetPassword }
