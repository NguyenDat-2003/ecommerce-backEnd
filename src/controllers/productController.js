import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'

const createNewPro = async (req, res, next) => {
  try {
    const newPro = await productService.createNew(req.body)
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

export const productController = { createNewPro, getPro, getAllPro, updatePro, deletePro }
