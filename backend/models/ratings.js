const db = require("./db.js")

const createNewRating = async (movieId, userId, rating) => {
    return db.query(
        "INSERT INTO ratings (\"movieId\", \"userId\", rating) VALUES ($1, $2, $3) RETURNING *",
        [movieId, userId, rating]
    ).then((result) => {
        return result.rows[0]
    })
}

const updateRating = async (movieId, userId, rating) => {
    return db.query(
        "UPDATE ratings SET rating = $1 WHERE \"movieId\" = $2 AND \"userId\" = $3 RETURNING *",
        [rating, movieId, userId]
    ).then((result) => {
        return result.rows[0]
    })
}

const deleteRating = async (movieId, userId) => {
    // console.log("This command is being ran")
    return db.query(
        "DELETE FROM ratings WHERE \"movieId\" = $1 AND \"userId\" = $2 RETURNING *",
        [movieId, userId]
    ).then((result) => {
        return result.rows[0]
    })
}

const getRating = async (movieId, userId) => {
    return db.query(
        "SELECT * FROM ratings WHERE \"movieId\" = $1 AND \"userId\" = $2",
        [movieId, userId]
    ).then((result) => {
        if (result.rows[0]) {
            return {message:"Rating exists", rating: result.rows[0]}
        } else {
            return {message:"Rating does not exist"}
        }

    })
}

module.exports = { createNewRating, updateRating, deleteRating, getRating }
