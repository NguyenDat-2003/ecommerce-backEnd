import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'
import { createSignToken } from '~/utils/createSignToken'

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

const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req)
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const user = await authService.resetPassword(req.params.token, req.body)
    createSignToken(user, StatusCodes.OK, res)
  } catch (error) {
    next(error)
  }
}
export const authController = { signup, login, logout, forgotPassword, resetPassword }
