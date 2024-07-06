/* eslint-disable no-useless-catch */
import Coupon from '~/models/couponModel'
import validateMongoDbId from '~/utils/validateMongoDbId'

const createNew = async (reqBody) => {
  try {
    return await Coupon.create(reqBody)
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await Coupon.find()
  } catch (error) {
    throw error
  }
}

const getDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    return await Coupon.findById(_id)
  } catch (error) {
    throw error
  }
}

const updateDetail = async (_id, reqBody) => {
  validateMongoDbId(_id)
  try {
    return await Coupon.findByIdAndUpdate(_id, reqBody, { new: true })
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    return await Coupon.findByIdAndDelete(_id)
  } catch (error) {
    throw error
  }
}

export const couponService = { createNew, getAll, getDetail, updateDetail, deleteDetail }
