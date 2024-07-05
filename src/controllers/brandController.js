import { StatusCodes } from 'http-status-codes'
import { brandService } from '~/services/brandService'

const createNewBrand = async (req, res, next) => {
  try {
    const newBrand = await brandService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(newBrand)
  } catch (error) {
    next(error)
  }
}

const getAllBrand = async (req, res, next) => {
  try {
    const cate = await brandService.getAll()
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const getBrand = async (req, res, next) => {
  try {
    const cate = await brandService.getDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const updateBrand = async (req, res, next) => {
  try {
    const cate = await brandService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const deleteBrand = async (req, res, next) => {
  try {
    const cate = await brandService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

export const brandController = { createNewBrand, getAllBrand, getBrand, updateBrand, deleteBrand }
