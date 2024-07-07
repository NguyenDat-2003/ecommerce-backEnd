import express from 'express'
import { authController } from '~/controllers/authController'
import { userController } from '~/controllers/userController'
import { restrictTo } from '~/middlewares/restrictTo'
import { verifyToken } from '~/middlewares/verifyToken'
import { userValidation } from '~/validations/userValidation'

const router = express.Router()

router.post('/signup', userValidation.createNewUser, authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.post('/forgotPassword', authController.forgotPassword)
router.put('/resetPassword/:token', authController.resetPassword)

//---Protect all routes after this middleware
router.use(verifyToken)
router.put('/updatePassword', userValidation.updatePass, userController.updatePassword)
router.put('/updateMe', userController.uploadUserPhoto, userController.resizeUserImg, userController.updateMe)

router.get('/wishlist', userController.getWishlist)
router.post('/add-cart', userController.addCartUser)
router.get('/my-cart', userController.getCartUser)
router.delete('/empty-cart', userController.emptyCart)

router.use(restrictTo('admin'))
router.route('/').get(userController.getAllUser).post(userValidation.createNewUser, userController.createNewUser)
router.route('/:id').get(userController.getUser).put(userValidation.updateUser, userController.updateUser).delete(userController.deleteUser)

export const userRoute = router
