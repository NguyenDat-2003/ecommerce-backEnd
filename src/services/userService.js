/* eslint-disable no-useless-catch */
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

import User from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import cloudinaryUploadImg from '~/utils/cloudinaryUploadImg'
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

const updatePassword = async (reqBody, currentUser) => {
  const { currentPassword, newPassword } = reqBody

  // 1) Get user from collection
  const user = await User.findById(currentUser._id).select('+password')

  // 2) Check if POSTed current password is correct
  if (!(await bcrypt.compare(currentPassword, currentUser.password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Your current password is wrong.')
  }
  // // 3) If so, update password
  user.password = await bcrypt.hash(newPassword, 12)

  //-- không sử dụng findByIdAndUpdate cho bất kì điều gì liên quan đến mật khẩu
  // User.findByIdAndUpdate will NOT work as intended!
  await user.save()

  return user
}

const updateMe = async (_id, reqBody, reqFile) => {
  try {
    const result = await cloudinaryUploadImg(reqFile.path)
    const newBody = {
      ...reqBody,
      avatar: result.secure_url
    }

    return await User.findByIdAndUpdate(_id, newBody, { new: true })
  } catch (error) {
    throw error
  }
}

const getWishlist = async (idUser) => {
  validateMongoDbId(idUser)
  try {
    return await User.findById(idUser).populate('wishlist')
  } catch (error) {
    throw error
  }
}

export const userService = { createNew, getAll, getDetail, updateDetail, deleteDetail, updatePassword, updateMe, getWishlist }
