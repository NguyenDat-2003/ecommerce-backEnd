import express from 'express'
import { couponController } from '~/controllers/couponController'
import { restrictTo } from '~/middlewares/restrictTo'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.use(verifyToken, restrictTo('admin'))
router.route('/').post(couponController.createNewCoupon).get(couponController.getAllCoupons)
router.route('/:id').get(couponController.getCoupon).put(couponController.updateCoupon).delete(couponController.deleteCoupon)

export const couponRoute = router
