import mongoose from 'mongoose'
import ApiError from './ApiError'
import { StatusCodes } from 'http-status-codes'

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if (!isValid) throw new ApiError(StatusCodes.BAD_REQUEST, 'Your string fails to match the Object Id pattern!')
}

export default validateMongoDbId
