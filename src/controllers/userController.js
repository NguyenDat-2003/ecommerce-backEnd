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
export const userController = { createNewUser }
