const mongoose = require("mongoose")
const { model, Schema } = mongoose

let organizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "The organizer name must be filled in"],
    },
  },
  { timestamps: true }
)

module.exports = model("Organizer", organizerSchema)
