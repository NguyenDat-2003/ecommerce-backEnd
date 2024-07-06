import express from 'express'
import { userRoute } from './userRoute'
import { productRoute } from './productRoute'
import { blogRoute } from './blogRoute'
import { categoryRoute } from './categoryRoute'
import { brandRoute } from './brandRoute'
import { reviewRoute } from './reviewRoute'
import { couponRoute } from './couponRoute'

const router = express.Router()

router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/blogs', blogRoute)
router.use('/categories', categoryRoute)
router.use('/brands', brandRoute)
router.use('/reviews', reviewRoute)
router.use('/coupons', couponRoute)

export const APIs_V1 = router
