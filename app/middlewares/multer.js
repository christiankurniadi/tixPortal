const multer = require("multer")
const { v4: uuidv4 } = require("uuid")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/")
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4() + "-" + file.originalname
    cb(null, uniqueFilename)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true)
  } else {
    cb(
      {
        message: "unsupported file format",
      },
      false
    )
  }
}

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
})

module.exports = uploadMiddleware
