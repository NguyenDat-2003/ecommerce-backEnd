import { StatusCodes } from 'http-status-codes'
import sharp from 'sharp'

import { productService } from '~/services/productService'
import upload from '~/utils/uploadMulter'

const createNewPro = async (req, res, next) => {
  try {
    const newPro = await productService.createNew(req.body, req.files.images)
    return res.status(StatusCodes.CREATED).json(newPro)
  } catch (error) {
    next(error)
  }
}

const getAllPro = async (req, res, next) => {
  try {
    const prods = await productService.getAll(req.query)
    return res.status(StatusCodes.OK).json(prods)
  } catch (error) {
    next(error)
  }
}

const getPro = async (req, res, next) => {
  try {
    const prod = await productService.getDetail(req.params.id)
    return res.status(StatusCodes.OK).json(prod)
  } catch (error) {
    next(error)
  }
}

const updatePro = async (req, res, next) => {
  try {
    const prod = await productService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.OK).json(prod)
  } catch (error) {
    next(error)
  }
}

const deletePro = async (req, res, next) => {
  try {
    const prod = await productService.deleteDetail(req.params.id)
    return res.status(StatusCodes.OK).json(prod)
  } catch (error) {
    next(error)
  }
}

const addToWishList = async (req, res, next) => {
  try {
    const prod = await productService.addToWishList(req)
    return res.status(StatusCodes.OK).json(prod)
  } catch (error) {
    next(error)
  }
}

const uploadProPhoto = upload.fields([{ name: 'images', maxCount: 3 }])

const resizeProImg = async (req, res, next) => {
  if (!req.files.images) return next()

  await Promise.all(
    req.files.images.map(async (file) => {
      await sharp(file.path).resize(2000, 1333).toFormat('jpeg').jpeg({ quality: 90 })
    })
  )

  next()
}

export const productController = { createNewPro, getPro, getAllPro, updatePro, deletePro, addToWishList, uploadProPhoto, resizeProImg }
