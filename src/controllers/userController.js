import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createNewUser = async (req, res, next) => {
  try {
    const newUser = await userService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(newUser)
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
export const userController = { createNewUser }
