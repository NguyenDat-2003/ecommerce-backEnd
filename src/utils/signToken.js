import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

const signToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    //---JWT hết hạn sau 3d - 3ngày
    expiresIn: env.JWT_EXPIRES_IN
  })
}
export default signToken
