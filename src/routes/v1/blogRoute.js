import express from 'express'
import { blogController } from '~/controllers/blogController'
import { restrictTo } from '~/middlewares/restrictTo'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.put('/like', verifyToken, blogController.liketheBlog)
router.put('/dislike', verifyToken, blogController.disliketheBlog)

router.get('/', blogController.getAllBlog)
router.get('/:id', blogController.getBlog)

router.use(verifyToken, restrictTo('admin'))
router.route('/').post(blogController.createNewBlog)
router.route('/:id').put(blogController.updateBlog).delete(blogController.deleteBlog)

export const blogRoute = router
