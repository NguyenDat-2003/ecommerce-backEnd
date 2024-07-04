import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { authService } from '~/services/authService'
import signToken from '~/utils/signToken'

const createSignToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      //--Đổi thời gian 30 ngày lưu cookie sang milisecond
      Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }
  if (env.BUILD_MODE === 'production') cookieOptions.secure = true

  user.password = undefined

  res.cookie('token', token, cookieOptions)

  return res.status(statusCode).json(user)
}

const signup = async (req, res, next) => {
  try {
    const newUser = await authService.signup(req.body)
    createSignToken(newUser, StatusCodes.OK, res)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body)
    createSignToken(user, StatusCodes.OK, res)
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  res.clearCookie('token').status(StatusCodes.OK).json({ status: 'Logout Successful' })
}
export const authController = { signup, login, logout }
