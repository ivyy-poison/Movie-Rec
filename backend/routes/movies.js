const express = require("express")
const router = express.Router()
const { getMovieById, getPopularMovies } = require("../controllers/getMovies.js")
const { verifyJWT } = require("../controllers/handleUsers.js")
const { createRatingHandler, 
        updateRatingHandler, 
        deleteRatingHandler, 
        getRatingHandler } = require("../controllers/handleRatings.js")

        
router.get("/popular", getPopularMovies)
router.get("/:id", getMovieById)
router.route("/:id/rating")
        .post(verifyJWT, createRatingHandler)
        .put(verifyJWT, updateRatingHandler)
        .delete(verifyJWT, deleteRatingHandler)
        .get(verifyJWT, getRatingHandler)

module.exports = router