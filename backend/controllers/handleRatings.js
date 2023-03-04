const { createNewRating, updateRating, deleteRating, getRating } = require("../models/ratings.js")

const createRatingHandler = async (req, res) => {

    const { movieId, rating } = req.body
    const { userId } = req.user
    if (userId) {
        const newRating = await createNewRating(movieId, userId, rating)
        res.status(201).json(newRating)
    } else {
        res.status(400).json({ message: "Unable to validate user's authentication" })
    }
}

const updateRatingHandler = async (req, res) => {
    const { movieId, rating } = req.body
    const { userId } = req.user
    if (userId) {
        const updatedRating = await updateRating(movieId, userId, rating)
        res.status(201).json(updatedRating)
    } else {
        res.status(400).json({ message: "Unable to validate user's authentication" })
    }
}

const deleteRatingHandler = async (req, res) => {
    const { movieId } = req.body
    const { userId } = req.user
    if (userId) {
        const deletedRating = await deleteRating(movieId, userId)
        res.status(201).json(deletedRating)
    } else {
        res.status(400).json({ message: "Unable to validate user's authentication" })
    }
}

const getRatingHandler = async (req, res) => {
    const { movieId } = req.body
    const { userId } = req.user
    if (userId) {
        const rating = await getRating(movieId, userId)
        res.status(201).json(rating)
    } else {
        res.status(400).json({ message: "Unable to validate user's authentication" })
    }
}

module.exports = { createRatingHandler, updateRatingHandler, deleteRatingHandler, getRatingHandler }