import { StatusCodes } from 'http-status-codes'
import { couponService } from '~/services/couponService'

const createNewCoupon = async (req, res, next) => {
  try {
    const coupon = await couponService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(coupon)
  } catch (error) {
    next(error)
  }
}

const getAllCoupons = async (req, res, next) => {
  try {
    const cate = await couponService.getAll()
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const getCoupon = async (req, res, next) => {
  try {
    const cate = await couponService.getDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const updateCoupon = async (req, res, next) => {
  try {
    const cate = await couponService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const deleteCoupon = async (req, res, next) => {
  try {
    const cate = await couponService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

export const couponController = { createNewCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon }
