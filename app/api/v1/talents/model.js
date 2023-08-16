const mongoose = require("mongoose")
const { model, Schema } = mongoose

const talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Talent name must be provided"],
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: [true, "Talent image must be provided"],
    },
  },
  { timestamps: true }
)

module.exports = model("Talent", talentSchema)
