/* eslint-disable no-useless-catch */
import Product from '~/models/productModel'
import Review from '~/models/reviewModel'
import validateMongoDbId from '~/utils/validateMongoDbId'

const calcAverageRatings = async () => {
  return await Review.aggregate([
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ])
}

const createNew = async (req) => {
  const { product } = req.body
  const reqBody = {
    ...req.body,
    user: req.user._id
  }
  try {
    const review = await Review.create(reqBody)
    if (review) {
      const stats = await calcAverageRatings()
      if (stats.length > 0) {
        await Product.findByIdAndUpdate(product, {
          totalrating: stats[0].nRating,
          ratingsAverage: stats[0].avgRating
        })
      } else {
        await Product.findByIdAndUpdate(product, {
          totalrating: 0,
          ratingsAverage: 4
        })
      }

      await Product.findByIdAndUpdate(review.product, {
        $push: { reviewIds: review._id }
      })
    }
    return review
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await Review.find()
  } catch (error) {
    throw error
  }
}

const getDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    return await Review.findById(_id)
  } catch (error) {
    throw error
  }
}

const updateDetail = async (_id, reqBody) => {
  validateMongoDbId(_id)
  try {
    return await Review.findByIdAndUpdate(_id, reqBody, { new: true })
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    const review = await Review.findByIdAndDelete(_id)
    if (review) {
      const stats = await calcAverageRatings()
      if (stats.length > 0) {
        await Product.findByIdAndUpdate(review.product, {
          totalrating: stats[0].nRating,
          ratingsAverage: stats[0].avgRating
        })
      } else {
        await Product.findByIdAndUpdate(review.product, {
          totalrating: 0,
          ratingsAverage: 4
        })
      }

      await Product.findByIdAndUpdate(review.product, {
        $pull: { reviewIds: review._id }
      })
    }
    return review
  } catch (error) {
    throw error
  }
}

export const reviewService = { createNew, getAll, getDetail, updateDetail, deleteDetail }
