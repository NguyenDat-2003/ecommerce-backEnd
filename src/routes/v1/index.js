import express from 'express'
import { userRoute } from './userRoute'
import { productRoute } from './productRoute'

const router = express.Router()

router.use('/users', userRoute)
router.use('/products', productRoute)

export const APIs_V1 = router
