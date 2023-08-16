const { StatusCodes } = require("http-status-codes")
const {
  createEvent,
  getAllEvents,
} = require("../../../services/mongoose/events")

const create = async (req, res, next) => {
  try {
    const result = await createEvent(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req)
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { create, index }
