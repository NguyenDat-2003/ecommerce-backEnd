/* eslint-disable no-useless-catch */
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import Cart from '~/models/cartModel'
import Coupon from '~/models/couponModel'
import Order from '~/models/orderModel'
import Product from '~/models/productModel'

import User from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import cloudinaryUploadImg from '~/utils/cloudinaryUploadImg'
import validateMongoDbId from '~/utils/validateMongoDbId'

const createNew = async (reqBody) => {
  try {
    const user = {
      ...reqBody,
      password: await bcrypt.hash(reqBody.password, 12)
    }
    const newUser = await User.create(user)
    newUser.password = undefined
    return newUser
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await User.find().select('-password')
  } catch (error) {
    throw error
  }
}

const getDetail = async (id) => {
  try {
    validateMongoDbId(id)
    return await User.findById(id).select('-password')
  } catch (error) {
    throw error
  }
}

const updateDetail = async (id, reqBody) => {
  try {
    validateMongoDbId(id)
    return await User.findByIdAndUpdate({ _id: id }, reqBody, {
      new: true
    }).select('-password')
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (id) => {
  try {
    validateMongoDbId(id)
    return await User.findByIdAndDelete({ _id: id })
  } catch (error) {
    throw error
  }
}

const updatePassword = async (reqBody, currentUser) => {
  const { currentPassword, newPassword } = reqBody

  // 1) Get user from collection
  const user = await User.findById(currentUser._id).select('+password')

  // 2) Check if POSTed current password is correct
  if (!(await bcrypt.compare(currentPassword, currentUser.password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Your current password is wrong.')
  }
  // // 3) If so, update password
  user.password = await bcrypt.hash(newPassword, 12)

  //-- không sử dụng findByIdAndUpdate cho bất kì điều gì liên quan đến mật khẩu
  // User.findByIdAndUpdate will NOT work as intended!
  await user.save()

  return user
}

const updateMe = async (_id, reqBody, reqFile) => {
  try {
    const result = await cloudinaryUploadImg(reqFile.path)
    const newBody = {
      ...reqBody,
      avatar: result.secure_url
    }

    return await User.findByIdAndUpdate(_id, newBody, { new: true })
  } catch (error) {
    throw error
  }
}

const getWishlist = async (idUser) => {
  validateMongoDbId(idUser)
  try {
    return await User.findById(idUser).populate('wishlist')
  } catch (error) {
    throw error
  }
}

const addCartUser = async (reqBody, idUser) => {
  validateMongoDbId(idUser)
  const { cart } = reqBody
  try {
    let products = []
    const user = await User.findById(idUser)
    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id })
    if (alreadyExistCart) {
      alreadyExistCart.remove()
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {}
      object.product = cart[i].prodId
      object.count = cart[i].count
      object.color = cart[i].color
      let getPrice = await Product.findById(cart[i].prodId).select('price').exec()
      object.price = getPrice.price
      products.push(object)
    }
    let cartTotal = 0
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count
    }
    return await Cart.create({
      products,
      cartTotal,
      orderby: user?._id
    })
  } catch (error) {
    throw error
  }
}

const getCartUser = async (idUser) => {
  validateMongoDbId(idUser)
  try {
    return await Cart.findOne({ orderby: idUser }).populate('products.product', 'name price quantity')
  } catch (error) {
    throw error
  }
}

const emptyCart = async (idUser) => {
  validateMongoDbId(idUser)
  try {
    return await Cart.findOneAndRemove({ orderby: idUser })
  } catch (error) {
    throw error
  }
}

const applyCoupon = async (idUser, reqBody) => {
  validateMongoDbId(idUser)
  try {
    const validCoupon = await Coupon.findOne({ name: reqBody.coupon })
    if (!validCoupon) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Coupon')
    }
    let { cartTotal } = await Cart.findOne({
      orderby: idUser
    }).populate('products.product')
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2)
    return await Cart.findOneAndUpdate({ orderby: idUser }, { totalAfterDiscount }, { new: true })
  } catch (error) {
    throw error
  }
}

const cashOrder = async (idUser, reqBody) => {
  const { COD, couponApplied } = reqBody

  validateMongoDbId(idUser)
  try {
    if (!COD) throw new Error('Create cash order failed')
    let userCart = await Cart.findOne({ orderby: idUser })
    let finalAmout = 0
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount
    } else {
      finalAmout = userCart.cartTotal
    }
    // ---- Tạo mới Order
    await new Order({
      products: userCart.products,
      paymentIntent: {
        // id: uniqid(),
        method: 'COD',
        amount: finalAmout,
        status: 'Cash on Delivery',
        created: Date.now(),
        currency: 'usd'
      },
      orderby: idUser,
      orderStatus: 'Cash on Delivery'
    }).save()
    // ---- Cập nhật số lượng tồn kho và số lượng đã bán của sản phẩm
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } }
        }
      }
    })
    await Product.bulkWrite(update, {})
    return { message: 'successfully' }
  } catch (error) {
    throw new Error(error)
  }
}

export const userService = {
  createNew,
  getAll,
  getDetail,
  updateDetail,
  deleteDetail,
  updatePassword,
  updateMe,
  getWishlist,
  addCartUser,
  getCartUser,
  emptyCart,
  applyCoupon,
  cashOrder
}
