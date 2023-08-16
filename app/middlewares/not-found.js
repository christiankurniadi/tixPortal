const notFound = (req, res) => {
  res.status(404).send({ msg: "Router does not exist" })
}

module.exports = notFound
