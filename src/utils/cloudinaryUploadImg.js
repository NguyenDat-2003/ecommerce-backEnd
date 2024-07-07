/* eslint-disable no-useless-catch */
import cloudinary from 'cloudinary'
import { env } from '~/config/environment'

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.API_KEY,
  api_secret: env.SECRET_KEY
})

const cloudinaryUploadImg = async (path) => {
  try {
    return await cloudinary.uploader.upload(path)
  } catch (error) {
    throw error
  }
}
export default cloudinaryUploadImg
