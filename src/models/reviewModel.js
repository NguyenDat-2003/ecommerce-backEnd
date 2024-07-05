import mongoose from 'mongoose'

var reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      require: [true, 'Review must belong to a product']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'Review must belong to a user']
    }
  },
  {
    timestamps: true
  }
)

//Export the model
const Review = mongoose.model('Review', reviewSchema)
export default Review
