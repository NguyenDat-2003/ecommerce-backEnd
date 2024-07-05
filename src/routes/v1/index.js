import express from 'express'
import { userRoute } from './userRoute'
import { productRoute } from './productRoute'
import { blogRoute } from './blogRoute'

const router = express.Router()

router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/blogs', blogRoute)

export const APIs_V1 = router
