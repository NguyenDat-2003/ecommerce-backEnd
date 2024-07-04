/* eslint-disable no-useless-catch */
import bcrypt from 'bcryptjs'

import User from '~/models/userModel'
import validateMongoDbId from '~/utils/validateMongoDbId'

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

const getAll = async () => {
  try {
    return await User.find().select('-password')
  } catch (error) {
    throw error
  }
}

const getDetail = async (id) => {
  try {
    validateMongoDbId(id)
    return await User.findById(id).select('-password')
  } catch (error) {
    throw error
  }
}

const updateDetail = async (id, reqBody) => {
  try {
    validateMongoDbId(id)
    return await User.findByIdAndUpdate({ _id: id }, reqBody, {
      new: true
    }).select('-password')
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (id) => {
  try {
    validateMongoDbId(id)
    return await User.findByIdAndDelete({ _id: id })
  } catch (error) {
    throw error
  }
}
export const userService = { createNew, getAll, getDetail, updateDetail, deleteDetail }
