const express = require("express")
const router = express.Router()
const { getMovieById, getPopularMovies } = require("../controllers/getMovies.js")

router.get("/:id", getMovieById)
router.get("/popular", getPopularMovies)

module.exports = router