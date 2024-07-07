/* eslint-disable no-useless-catch */
import Product from '~/models/productModel'
import User from '~/models/userModel'
import APIFeatures from '~/utils/ApiFeatures'
import cloudinaryUploadImg from '~/utils/cloudinaryUploadImg'
import slugify from '~/utils/slugify'
import validateMongoDbId from '~/utils/validateMongoDbId'

const createNew = async (reqBody, reqFiles) => {
  const images_url = []
  try {
    await Promise.all(
      reqFiles.map(async (file) => {
        const result = await cloudinaryUploadImg(file.path)
        images_url.push(result.url)
      })
    )

    const body = {
      ...reqBody,
      images: images_url,
      slug: slugify(reqBody.name)
    }
    return await Product.create(body)
  } catch (error) {
    throw error
  }
}

const getAll = async (query) => {
  try {
    const features = new APIFeatures(Product.find(), query).filter().sort().limitFields().paginate()
    return await features.query
  } catch (error) {
    throw error
  }
}

const getDetail = async (_id) => {
  try {
    validateMongoDbId(_id)
    return await Product.findById(_id)
  } catch (error) {
    throw error
  }
}

const updateDetail = async (_id, reqBody) => {
  try {
    validateMongoDbId(_id)
    if (reqBody.name) {
      reqBody.slug = slugify(reqBody.name)
    }
    return await Product.findByIdAndUpdate(_id, reqBody, { new: true })
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (_id) => {
  try {
    validateMongoDbId(_id)
    return await Product.findByIdAndDelete(_id)
  } catch (error) {
    throw error
  }
}

const addToWishList = async (req) => {
  const { _id } = req.user
  const { prodId } = req.body
  try {
    const user = await User.findById(_id)
    const alreadyadded = user?.wishlist?.find((id) => id.toString() === prodId)
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId }
        },
        {
          new: true
        }
      )
      return user
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId }
        },
        {
          new: true
        }
      )
      return user
    }
  } catch (error) {
    throw error
  }
}

export const productService = { createNew, getAll, getDetail, updateDetail, deleteDetail, addToWishList }
