import express from 'express'
import { productController } from '~/controllers/productController'
import { restrictTo } from '~/middlewares/restrictTo'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.route('/').get(productController.getAllPro)
router.route('/:id').get(productController.getPro)

router.use(verifyToken)
router.put('/wishlist', productController.addToWishList)

router.use(restrictTo('admin'))
router.post('/', productController.uploadProPhoto, productController.resizeProImg, productController.createNewPro)
router.put('/:id', productController.updatePro)
router.delete('/:id', productController.deletePro)

export const productRoute = router
