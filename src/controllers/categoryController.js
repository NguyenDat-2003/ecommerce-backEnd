import { StatusCodes } from 'http-status-codes'
import { categoryService } from '~/services/categoryService'

const createNewCate = async (req, res, next) => {
  try {
    const newCate = await categoryService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(newCate)
  } catch (error) {
    next(error)
  }
}

const getAllCate = async (req, res, next) => {
  try {
    const cate = await categoryService.getAll()
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const getCate = async (req, res, next) => {
  try {
    const cate = await categoryService.getDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const updateCate = async (req, res, next) => {
  try {
    const cate = await categoryService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

const deleteCate = async (req, res, next) => {
  try {
    const cate = await categoryService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(cate)
  } catch (error) {
    next(error)
  }
}

export const categoryController = { createNewCate, getAllCate, getCate, updateCate, deleteCate }
