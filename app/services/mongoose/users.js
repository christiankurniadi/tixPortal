const Users = require("../../api/v1/users/model")
const Organizers = require("../../api/v1/organizers/model")
const { BadRequestError } = require("../../errors")

const createOrganizer = async (req) => {
  const { name, email, password, confirmPassword, organizer, role } = req.body

  if (password !== confirmPassword) {
    throw new BadRequestError("Password and confirm password unmatched")
  }

  const result = await Organizers.create({ organizer })
  const users = await Users.create({
    name,
    email,
    password,
    role,
    organizer: result._id,
  })

  delete users._doc.password

  return users
}

module.exports = { createOrganizer }
