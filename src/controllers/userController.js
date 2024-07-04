import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

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
export const userController = { createNewUser, getAllUser, getUser, updateUser, deleteUser }
