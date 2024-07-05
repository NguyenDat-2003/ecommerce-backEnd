/* eslint-disable no-useless-catch */
import Category from '~/models/category'
import validateMongoDbId from '~/utils/validateMongoDbId'

const createNew = async (reqBody) => {
  try {
    return await Category.create(reqBody)
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await Category.find()
  } catch (error) {
    throw error
  }
}

const getDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    return await Category.findById(_id)
  } catch (error) {
    throw error
  }
}

const updateDetail = async (_id, reqBody) => {
  validateMongoDbId(_id)
  try {
    return await Category.findByIdAndUpdate(_id, reqBody, { new: true })
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    return await Category.findByIdAndDelete(_id)
  } catch (error) {
    throw error
  }
}

export const categoryService = { createNew, getAll, getDetail, updateDetail, deleteDetail }
