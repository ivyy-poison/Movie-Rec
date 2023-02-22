const express = require("express")
const router = express.Router()
const { getMovieById } = require("../controllers/getMovies.js")

router.get("/:id", getMovieById)


module.exports = router