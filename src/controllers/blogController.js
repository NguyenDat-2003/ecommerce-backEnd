import { StatusCodes } from 'http-status-codes'
import { blogService } from '~/services/blogService'

const createNewBlog = async (req, res, next) => {
  try {
    const newBlog = await blogService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(newBlog)
  } catch (error) {
    next(error)
  }
}

const getAllBlog = async (req, res, next) => {
  try {
    const blog = await blogService.getAll()
    return res.status(StatusCodes.CREATED).json(blog)
  } catch (error) {
    next(error)
  }
}

const getBlog = async (req, res, next) => {
  try {
    const blog = await blogService.getDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(blog)
  } catch (error) {
    next(error)
  }
}

const updateBlog = async (req, res, next) => {
  try {
    const newBlog = await blogService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json(newBlog)
  } catch (error) {
    next(error)
  }
}

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await blogService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(blog)
  } catch (error) {
    next(error)
  }
}

const liketheBlog = async (req, res, next) => {
  try {
    const blog = await blogService.liketheBlog(req)
    return res.status(StatusCodes.CREATED).json(blog)
  } catch (error) {
    next(error)
  }
}

const disliketheBlog = async (req, res, next) => {
  try {
    const blog = await blogService.disliketheBlog(req)
    return res.status(StatusCodes.CREATED).json(blog)
  } catch (error) {
    next(error)
  }
}

export const blogController = { createNewBlog, getAllBlog, getBlog, updateBlog, deleteBlog, liketheBlog, disliketheBlog }
