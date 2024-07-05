import mongoose from 'mongoose'

var productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category'
    },
    brand: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    images: [],
    reviewIds: [],
    totalrating: {
      type: Number,
      default: 0
    },
    ratingsAverage: {
      type: Number,
      default: 4,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10 //EX: val = 4.66666 * 10 = 46.6666 => 47 / 10 = 4.7
    }
  },
  { timestamps: true }
)

//Export the model
const Product = mongoose.model('Product', productSchema)
export default Product
