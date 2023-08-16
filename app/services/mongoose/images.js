const Images = require("../../api/v1/images/model")
const { NotFoundError } = require("../../errors")

const createImage = async (req) => {
  const result = await Images.create({
    name: req.file ? `uploads/${req.file.filename}` : "uploads/default.png",
  })
  return result
}

const checkImageExistence = async (id) => {
  const result = await Images.findOne({ _id: id })
  if (!result) throw new NotFoundError(`Image with ID ${id} not found.`)

  return result
}

module.exports = { createImage, checkImageExistence }
