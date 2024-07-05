/* eslint-disable no-useless-catch */
import Blog from '~/models/blogModel'
import validateMongoDbId from '~/utils/validateMongoDbId'

const createNew = async (reqBody) => {
  try {
    return await Blog.create(reqBody)
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await Blog.find()
  } catch (error) {
    throw error
  }
}

const getDetail = async (_id) => {
  validateMongoDbId(_id)
  try {
    const blog = await Blog.findById(_id).populate('likes', '-password').populate('dislikes', '-password')
    await Blog.findByIdAndUpdate(
      _id,
      {
        $inc: { numViews: 1 }
      },
      { new: true }
    )
    return blog
  } catch (error) {
    throw error
  }
}

const updateDetail = async (_id, reqBody) => {
  try {
    validateMongoDbId(_id)
    return await Blog.findByIdAndUpdate(_id, reqBody, { new: true })
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (_id) => {
  try {
    validateMongoDbId(_id)
    return await Blog.findByIdAndDelete(_id)
  } catch (error) {
    throw error
  }
}

const liketheBlog = async (req) => {
  try {
    const { blogId } = req.body
    validateMongoDbId(blogId)
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId)
    // find the login user
    const loginUserId = req?.user?._id
    // find if the user has liked the blog
    const isLiked = blog?.isLiked
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find((userId) => userId?.toString() === loginUserId?.toString())
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false
        },
        { new: true }
      )
      return blog
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false
        },
        { new: true }
      )
      return blog
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true
        },
        { new: true }
      )
      return blog
    }
  } catch (error) {
    throw error
  }
}

const disliketheBlog = async (req) => {
  const { blogId } = req.body
  validateMongoDbId(blogId)
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId)
  // find the login user
  const loginUserId = req?.user?._id
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find((userId) => userId?.toString() === loginUserId?.toString())
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false
      },
      { new: true }
    )
    return blog
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false
      },
      { new: true }
    )
    return blog
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true
      },
      { new: true }
    )
    return blog
  }
}
export const blogService = { createNew, getAll, getDetail, updateDetail, deleteDetail, liketheBlog, disliketheBlog }
