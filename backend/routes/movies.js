const express = require("express")
const router = express.Router()
const { getMovieById, getPopularMovies } = require("../controllers/getMovies.js")
const { verifyJWT } = require("../controllers/handleUsers.js")
const { createRatingHandler, updateRatingHandler, deleteRatingHandler, getRatingHandler } = require("../controllers/handleRatings.js")
const cors = require("cors");
router.use(cors({credentials: true, origin: 'http://localhost:3000'}));


router.get("/popular", getPopularMovies)

router.route("/:id/rating")
        .post(verifyJWT, createRatingHandler)
        .put(verifyJWT, updateRatingHandler)
        .delete(verifyJWT, deleteRatingHandler)
        .get(verifyJWT, getRatingHandler)

router.get("/:id", getMovieById)

// router.route("/:id/details").get(verifyJWT, ).put(verifyJWT, ).delete(verifyJWT, ).update(verifyJWT, )
// users/:id/movies is a route that will be used to add movies to a user's list

module.exports = router