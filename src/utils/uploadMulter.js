import multer from 'multer'
import ApiError from './ApiError'
import { StatusCodes } from 'http-status-codes'

const multerStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new ApiError(StatusCodes.BAD_REQUEST, 'Not an image! Please upload only images.'), false)
  }
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter })
export default upload
