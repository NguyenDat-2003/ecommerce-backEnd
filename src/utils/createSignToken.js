import { env } from '~/config/environment'
import signToken from '~/utils/signToken'

export const createSignToken = (user, statusCode, res) => {
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
