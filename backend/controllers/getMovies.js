require('dotenv').config();
const axios = require("axios")

const getMovieById = async (req, res) => {
    const id = req.params.id
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`    
    axios.get(url).then(response => {
        if (response) {
            res.json({message: "Movie found", data: response.data})
        } 
    }).catch(err => {

        return res.status(404).json({ message: "Invalid Movie Code, Movie not found" })
    })
}

// getRecommendation, getSimilarById, getPopular?
const getPopularMovies = async (req, res) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    axios.get(url).then(response => {
        if (response) {
            return res.json(response.data)
        } else {
            return res.status(404).json({ message: "Movie not found" })
        }
    }).catch(err => {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong" })
    })
}

module.exports = {getMovieById, getPopularMovies}