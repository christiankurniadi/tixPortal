const express = require("express")
const router = express()
const { create, index } = require("./controller")

router.get("/events", index)
// router.get("/events/:id", find)
router.post("/events", create)
// router.put("/events/:id", update)
// router.delete("/events/:id", destroy)

module.exports = router
