const { StatusCodes } = require("http-status-codes")
const {
  createEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  deleteEvent,
} = require("../../../services/mongoose/events")

// Controller function to create event
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

// Controller function to get all events
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

// Controller function to find event by id
const find = async (req, res, next) => {
  try {
    const result = await getOneEvent(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to update event
const update = async (req, res, next) => {
  try {
    const result = await updateEvent(req)

    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Controller function to delete event
const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvent(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { create, index, find, update, destroy }
