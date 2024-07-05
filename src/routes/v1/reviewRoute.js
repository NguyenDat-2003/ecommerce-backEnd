import express from 'express'
import { reviewController } from '~/controllers/reviewController'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.use(verifyToken)
router.route('/').post(reviewController.createNewReview).get(reviewController.getAllReview)
router.route('/:id').put(reviewController.updateReview).delete(reviewController.deleteReview)

export const reviewRoute = router
