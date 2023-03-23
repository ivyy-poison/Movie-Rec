import {Fragment, useState, useRef, useContext, useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LoginContext } from '../pages/_app'
import StarRatings from 'react-star-ratings'


type MovieDetails = {
    movieId: number;
    title: string;
    releaseYear: string;
    imageUrl: string;
    overview: string;
}

export default function MovieInfoPage(props: MovieDetails) {
    const {loggedIn, user } = useContext(LoginContext)

    async function handleRating() {
        const url = "http://localhost:8000/movies/" + movieId + "/rating"
        const method = hasRated ? "PUT" : "POST"
        console.log(`submitted rating of ${rating} using the ${method} method`)
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({movieId: movieId, rating: rating, userId: user.id})
        }).then((response) => {
            if (response.ok) {
                console.log("Rating submitted")
                return response.json()
            } else {
                return response.json().then(data => {
                    throw {messages: data.message, code: 400}
                })      
            } 
        }).catch((error) => {
            console.log(error.messages)
        })
    }

    const {movieId, title, releaseYear, imageUrl, overview} = props
    
    const [hasRated, setHasRated] = useState(false)

    const [rating, setRating] = useState(0);

    async function fetchRating() {
        const url = `http://localhost:8000/movies/${movieId}/rating`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await response.json()
        
        console.log(data)
        if (data.rating) {
            setHasRated(true)
            setRating(data.rating.rating)
            // setPreviousRatingId(data.rating.id)
        } else {
            setHasRated(false)
            setRating(0)
        }
    }

    useEffect(() => {
        fetchRating()
    }, [])


    return (
        <div className="bg-white p-4 rounded shadow-lg">
                
                <div className="p-4">
                    <img
                        className="object-cover rounded-t"
                        src={imageUrl}
                        alt={title}
                    />
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-gray-500">{releaseYear}</p>
                    <div className="mt-4">
                    <h3 className="text-lg font-semibold">Directors</h3>
                    {/* <ul className="list-disc list-inside">
                        {directors.map((director, idx) => (
                            <li key={idx}>{director}</li>
                        ))}
                    </ul> */}
                    </div>
                    <div className="mt-4">
                    <h3 className="text-lg font-semibold">Main Cast</h3>
                    {/* <ul className="list-disc list-inside">
                        {mainCast.map((actor, idx) => (
                            <li key={idx}>{actor}</li>
                        ))}
                    </ul> */}
                    </div>
                    <div className="mt-4">
                    <h3 className="text-lg font-semibold">Overview</h3>
                    <p>{overview}</p>
                    </div>
                    <div className="mt-4">
                    {(loggedIn) && (
                        <>              
                        <StarRatings
                            rating={rating}
                            starRatedColor="blue"
                            changeRating={(v) => setRating(v)}
                            numberOfStars={5}
                            name="rating"
                            starDimension="30px"
                        />
                        {(rating > 0) && (
                            <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleRating}
                            >
                                Rate
                            </button>
                        )}
                        </>
                    )}
                    </div>
                </div>
            </div>
    )

}