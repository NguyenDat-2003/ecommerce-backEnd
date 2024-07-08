import { StatusCodes } from 'http-status-codes'
import sharp from 'sharp'

import { userService } from '~/services/userService'
import { createSignToken } from '~/utils/createSignToken'
import upload from '~/utils/uploadMulter'

const createNewUser = async (req, res, next) => {
  try {
    const newUser = await userService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(newUser)
  } catch (error) {
    next(error)
  }
}

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAll()
    return res.status(StatusCodes.CREATED).json(users)
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const user = await userService.updatePassword(req.body, req.user)
    createSignToken(user, StatusCodes.OK, res)
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    const user = await userService.updateMe(req.user._id, req.body, req.file)
    return res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const uploadUserPhoto = upload.single('avatar')

const resizeUserImg = async (req, res, next) => {
  if (!req.file) return next()

  await sharp(req.file.path).resize(2000, 1333).toFormat('jpeg').jpeg({ quality: 90 })

  next()
}

const getWishlist = async (req, res, next) => {
  try {
    const wishList = await userService.getWishlist(req.user._id)
    return res.status(StatusCodes.OK).json(wishList)
  } catch (error) {
    next(error)
  }
}

const addCartUser = async (req, res, next) => {
  try {
    const carts = await userService.addCartUser(req.body, req.user._id)
    return res.status(StatusCodes.OK).json(carts)
  } catch (error) {
    next(error)
  }
}

const getCartUser = async (req, res, next) => {
  try {
    const carts = await userService.getCartUser(req.user._id)
    return res.status(StatusCodes.OK).json(carts)
  } catch (error) {
    next(error)
  }
}

const emptyCart = async (req, res, next) => {
  try {
    const carts = await userService.emptyCart(req.user._id)
    return res.status(StatusCodes.OK).json(carts)
  } catch (error) {
    next(error)
  }
}

const applyCoupon = async (req, res, next) => {
  try {
    const coupon = await userService.applyCoupon(req.user._id, req.body)
    return res.status(StatusCodes.OK).json(coupon)
  } catch (error) {
    next(error)
  }
}

const cashOrder = async (req, res, next) => {
  try {
    const coupon = await userService.cashOrder(req.user._id, req.body)
    return res.status(StatusCodes.OK).json(coupon)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createNewUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
  updateMe,
  uploadUserPhoto,
  resizeUserImg,
  getWishlist,
  addCartUser,
  getCartUser,
  emptyCart,
  applyCoupon,
  cashOrder
}
