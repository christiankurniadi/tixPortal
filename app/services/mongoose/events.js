const Events = require("../../api/v1/Events/model")
const { BadRequestError, NotFoundError } = require("../../errors")
const { checkImageExistence } = require("./images")
const { checkCategoryExistence } = require("./categories")
const { checkTalentExistence } = require("./talents")

// Function to create a new Event
const createEvent = async (req) => {
  const {
    title,
    date,
    description,
    venueName,
    location,
    duration,
    status,
    ageRestrictions,
    tickets,
    image,
    category,
    talents,
  } = req.body
  await checkImageExistence(image)
  await checkCategoryExistence(category)
  await checkTalentExistence(talents)
  const isEventDuplicate = await Events.findOne({
    title,
  })
  if (isEventDuplicate)
    throw new BadRequestError(`An event named ${title} already exists`)
  const result = await Events.create({
    title,
    date,
    description,
    venueName,
    location,
    duration,
    status,
    ageRestrictions,
    tickets,
    image,
    category,
    talents,
  })
  return result
}

// Function to get all categories
const getAllEvents = async (req) => {
  const { keyword, status, date, category, talents } = req.query
  let condition = {}
  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } }
  } else if (status) {
    condition = { ...condition, status: { $regex: status, $options: "i" } }
  } else if (talents) {
    condition = { ...condition, talents: { $regex: talents, $options: "i" } }
  } else if (date) {
    condition = { ...condition, date: date }
  }
  if (category) {
    condition = { ...condition, category: category }
  }

  // const result = await Events.find(condition)
  const result = await Events.find(condition)
    .populate({ path: "image", select: "_id name" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talents",
      select: "_id name image",
      populate: { path: "image", select: "_id  name" },
    })

  return result
}

// Function to find Event by id
const getOneEvent = async (req) => {
  const { id } = req.params
  const result = await Events.findOne({ _id: id })

  if (!result) throw new NotFoundError(`Event with ID ${id} not found.`)

  return result
}

// Function to update Event
const updateEvent = async (req) => {
  const { id } = req.params
  const {
    title,
    date,
    description,
    venueName,
    location,
    duration,
    status,
    ageRestrictions,
    tickets,
    image,
    category,
    talents,
  } = req.body
  const isEventExist = await Events.findById(id)

  if (!isEventExist) throw new NotFoundError(`Event with ID ${id} not found.`)

  const isEventNameDuplicate = await Events.findOne({
    title,
    _id: { $ne: id },
  })

  if (isEventNameDuplicate)
    throw new BadRequestError(`An event named ${title} already exists`)

  const result = await Events.findByIdAndUpdate(
    id,
    {
      title,
      date,
      description,
      venueName,
      location,
      duration,
      status,
      ageRestrictions,
      tickets,
      image,
      category,
      talents,
    },
    { new: true, runValidators: true }
  )

  return result
}

// Function to delete Event
const deleteEvent = async (req) => {
  const { id } = req.params
  const isEventExist = await Events.findById(id)

  if (!isEventExist) throw new NotFoundError(`Event with ID ${id} not found.`)

  const result = await Events.findByIdAndRemove(id)

  return result
}

// const checkEventExistence = async (id) => {
//   const result = await Events.findOne({ _id: id })
//   if (!result) throw new NotFoundError(`Event with ID ${id} not found.`)

//   return result
// }

module.exports = {
  getAllEvents,
  createEvent,
  getOneEvent,
  updateEvent,
  deleteEvent,
  //   checkEventExistence,
}
