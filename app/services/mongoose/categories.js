const Categories = require("../../api/v1/categories/model")
const { BadRequestError, NotFoundError } = require("../../errors")

// Function to create a new category
const createCategory = async (req) => {
  const { name } = req.body
  const isCategoryNameDuplicate = await Categories.findOne({ name })

  if (isCategoryNameDuplicate)
    throw new BadRequestError(`A category named ${name} already exists`)

  const result = await Categories.create({ name })
  return result
}

// Function to get all categories
const getAllCategories = async () => {
  const result = await Categories.find()

  return result
}

// Function to find category by id
const getOneCategory = async (req) => {
  const { id } = req.params
  const result = await Categories.findOne({ _id: id })

  if (!result) throw new NotFoundError(`Category with ID ${id} not found.`)

  return result
}

// Function to update category
const updateCategory = async (req) => {
  const { id } = req.params
  const { name } = req.body
  const isCategoryExist = await Categories.findById(id)

  if (!isCategoryExist)
    throw new NotFoundError(`Category with ID ${id} not found.`)

  const isCategoryNameDuplicate = await Categories.findOne({
    name,
    _id: { $ne: id },
  })

  if (isCategoryNameDuplicate)
    throw new BadRequestError(`A category named ${name} already exists`)

  const result = await Categories.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  )

  return result
}

// Function to delete category
const deleteCategory = async (req) => {
  const { id } = req.params
  const isCategoryExist = await Categories.findById(id)

  if (!isCategoryExist)
    throw new NotFoundError(`Category with ID ${id} not found.`)

  const result = await Categories.findByIdAndRemove(id)

  return result
}

const checkCategoryExistence = async (id) => {
  const result = await Categories.findOne({ _id: id })
  if (!result) throw new NotFoundError(`Category with ID ${id} not found.`)

  return result
}

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  checkCategoryExistence,
}
