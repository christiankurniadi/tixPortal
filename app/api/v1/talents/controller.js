const { StatusCodes } = require("http-status-codes")
const {
  getAllTalents,
  createTalent,
  getOneTalent,
  updateTalent,
  deleteTalent,
} = require("../../../services/mongoose/talents")

// Controller function to create a new Talent
const create = async (req, res, next) => {
  try {
    const result = await createTalent(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to get all Talents
const index = async (req, res, next) => {
  try {
    const result = await getAllTalents(req)
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to find Talent by id
const find = async (req, res, next) => {
  try {
    const result = await getOneTalent(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to update Talent
const update = async (req, res, next) => {
  try {
    const result = await updateTalent(req)

    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to delete Talent
const destroy = async (req, res, next) => {
  try {
    const result = await deleteTalent(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { create, index, find, update, destroy }
