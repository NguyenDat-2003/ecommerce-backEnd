/* eslint-disable no-useless-catch */
import Brand from '~/models/brandModel'
import validateMongoDbId from '~/utils/validateMongoDbId'

const createNew = async (reqBody) => {
  try {
    return await Brand.create(reqBody)
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await Brand.find()
  } catch (error) {
    throw error
  }
}

const getDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    return await Brand.findById(_id)
  } catch (error) {
    throw error
  }
}

const updateDetail = async (_id, reqBody) => {
  validateMongoDbId(_id)
  try {
    return await Brand.findByIdAndUpdate(_id, reqBody, { new: true })
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    return await Brand.findByIdAndDelete(_id)
  } catch (error) {
    throw error
  }
}

export const brandService = { createNew, getAll, getDetail, updateDetail, deleteDetail }
