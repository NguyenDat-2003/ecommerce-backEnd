import express from 'express'
import { brandController } from '~/controllers/brandController'
import { restrictTo } from '~/middlewares/restrictTo'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.use(verifyToken, restrictTo('admin'))
router.route('/').post(brandController.createNewBrand).get(brandController.getAllBrand)
router.route('/:id').get(brandController.getBrand).put(brandController.updateBrand).delete(brandController.deleteBrand)

export const brandRoute = router
