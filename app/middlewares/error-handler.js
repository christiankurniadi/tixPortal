const { StatusCodes } = require("http-status-codes")
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ")
    customError.statusCodes = 400
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCodes = 400
  }

  if (err.name === "castError") {
    customError.msg = `No item found with id ${Object.keys(err.value)}`
    customError.statusCodes = 404
  }

  return res.status(customError.statusCodes).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
