import express from 'express'
import { authController } from '~/controllers/authController'
import { userController } from '~/controllers/userController'
import { userValidation } from '~/validations/userValidation'

const router = express.Router()

router.post('/signup', userValidation.createNewUser, authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.post('/', userValidation.createNewUser, userController.createNewUser)

export const userRoute = router
