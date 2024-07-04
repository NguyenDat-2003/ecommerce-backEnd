/* eslint-disable no-useless-catch */
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import ApiError from '~/utils/ApiError'

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
export const authService = { login, signup }
