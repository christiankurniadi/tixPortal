const Talents = require("../../api/v1/talents/model")
const { BadRequestError, NotFoundError } = require("../../errors")
const { checkImageExistence } = require("./images")

// Function to create a new Talent
const createTalent = async (req) => {
  const { name, image } = req.body
  await checkImageExistence(image)
  const result = await Talents.create({ name, image })
  return result
}

// Function to get all categories
const getAllTalents = async (req) => {
  const { keyword } = req.query
  let condition = {}
  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } }
  }
  const result = await Talents.find(condition)
    .populate({ path: "image", select: "_id name" })
    .select("_id name image")

  return result
}

// Function to find Talent by id
const getOneTalent = async (req) => {
  const { id } = req.params
  const result = await Talents.findOne({ _id: id })

  if (!result) throw new NotFoundError(`Talent with ID ${id} not found.`)

  return result
}

// Function to update Talent
const updateTalent = async (req) => {
  const { id } = req.params
  const { name, image } = req.body
  const isTalentExist = await Talents.findById(id)

  if (!isTalentExist) throw new NotFoundError(`Talent with ID ${id} not found.`)

  const result = await Talents.findByIdAndUpdate(
    id,
    { name, image },
    { new: true, runValidators: true }
  )

  return result
}

// Function to delete Talent
const deleteTalent = async (req) => {
  const { id } = req.params
  const isTalentExist = await Talents.findById(id)

  if (!isTalentExist) throw new NotFoundError(`Talent with ID ${id} not found.`)

  const result = await Talents.findByIdAndRemove(id)

  return result
}

const checkTalentExistence = async (id) => {
  const result = await Talents.findOne({ _id: id })
  if (!result) throw new NotFoundError(`Talent with ID ${id} not found.`)

  return result
}

module.exports = {
  getAllTalents,
  createTalent,
  getOneTalent,
  updateTalent,
  deleteTalent,
  checkTalentExistence,
}
