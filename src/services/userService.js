/* eslint-disable no-useless-catch */
import bcrypt from 'bcryptjs'

import User from '~/models/userModel'

const createNew = async (reqBody) => {
  try {
    const user = {
      ...reqBody,
      password: await bcrypt.hash(reqBody.password, 12)
    }
    const newUser = await User.create(user)
    newUser.password = undefined
    return newUser
  } catch (error) {
    throw error
  }
}
export const userService = { createNew }
