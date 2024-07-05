import express from 'express'
import { categoryController } from '~/controllers/categoryController'
import { restrictTo } from '~/middlewares/restrictTo'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.use(verifyToken, restrictTo('admin'))
router.route('/').post(categoryController.createNewCate).get(categoryController.getAllCate)
router.route('/:id').get(categoryController.getCate).put(categoryController.updateCate).delete(categoryController.deleteCate)

export const categoryRoute = router
