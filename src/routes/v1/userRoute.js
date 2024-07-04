import express from 'express'
import { authController } from '~/controllers/authController'
import { userController } from '~/controllers/userController'
import { userValidation } from '~/validations/userValidation'

const router = express.Router()

router.post('/signup', userValidation.createNewUser, authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.route('/').get(userController.getAllUser).post(userValidation.createNewUser, userController.createNewUser)
router.route('/:id').get(userController.getUser).put(userValidation.updateUser, userController.updateUser).delete(userController.deleteUser)

export const userRoute = router
