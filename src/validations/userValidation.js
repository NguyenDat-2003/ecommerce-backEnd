import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNewUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    firstname: Joi.string().required().trim().strict(),
    lastname: Joi.string().required().trim().strict(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    mobile: Joi.string().required().min(10),
    password: Joi.string().required().trim().strict().min(6)
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const userValidation = { createNewUser }
