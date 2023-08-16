const mongoose = require("mongoose")
const { model, Schema } = mongoose

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Minimum category name length is 3 characters"],
      maxlength: [20, "Maximum category name length is 20 characters"],
      required: [true, "The category name must be filled in"],
    },
  },
  { timestamps: true }
)

module.exports = model("Category", categorySchema)
