const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "Minimum organizer name length is 3 characters"],
      maxlength: [20, "Maximum organizer name length is 20 characters"],
      required: [true, "The organizer name must be filled in"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email must be filled in"],
    },
    password: {
      type: String,
      required: [true, "Password must be filled in"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: ["admin"],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  const User = this
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12)
  }
  next()
})

userSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password)
  return isMatch
}

module.exports = mongoose.model("User", userSchema)
