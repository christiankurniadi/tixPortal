const mongoose = require("mongoose")

const ticketCategorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Ticket category type must be provided"],
  },
  price: {
    type: Number,
    default: 0,
  },
  availableStock: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  expirationDate: {
    type: Date,
  },
})

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be provided"],
      minlength: 3,
      maxlength: 50,
    },
    date: {
      type: Date,
      required: [true, "Date and time must be provided"],
    },
    description: {
      type: String,
    },
    venueName: {
      type: String,
      required: [true, "Venue must be provided"],
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    location: {
      type: String,
    },
    duration: {
      type: String,
    },
    ageRestrictions: {
      type: String,
    },
    tickets: {
      type: [ticketCategorySchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: [true, "Event image must be provided"],
    },
    category: {
      type: [mongoose.Types.ObjectId],
      ref: "Category",
      required: [true, "Event category must be provided"],
    },
    talents: {
      type: [mongoose.Types.ObjectId],
      ref: "Talent",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Event", EventSchema)
