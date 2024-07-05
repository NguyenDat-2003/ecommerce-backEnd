import { StatusCodes } from 'http-status-codes'
import { reviewService } from '~/services/reviewService'

const createNewReview = async (req, res, next) => {
  try {
    const review = await reviewService.createNew(req)
    return res.status(StatusCodes.CREATED).json(review)
  } catch (error) {
    next(error)
  }
}

const getAllReview = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAll()
    return res.status(StatusCodes.CREATED).json(reviews)
  } catch (error) {
    next(error)
  }
}

const updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json(review)
  } catch (error) {
    next(error)
  }
}

const deleteReview = async (req, res, next) => {
  try {
    const review = await reviewService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(review)
  } catch (error) {
    next(error)
  }
}

export const reviewController = { createNewReview, getAllReview, updateReview, deleteReview }
