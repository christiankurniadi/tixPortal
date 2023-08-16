const { StatusCodes } = require("http-status-codes")
const {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../../../services/mongoose/categories")

// Controller function to create a new category
const create = async (req, res, next) => {
  try {
    const result = await createCategory(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to get all categories
const index = async (req, res, next) => {
  try {
    const result = await getAllCategories()
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to find category by id
const find = async (req, res, next) => {
  try {
    const result = await getOneCategory(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to update category
const update = async (req, res, next) => {
  try {
    const result = await updateCategory(req)

    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to delete category
const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategory(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { create, index, find, update, destroy }
