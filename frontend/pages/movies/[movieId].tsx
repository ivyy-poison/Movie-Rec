import { useRouter } from 'next/router'
import Navbar from "../../components/Navbar";
import { useState, useContext, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { LoginContext } from '../_app';
import MovieInfoPage from "../../components/MovieInfoPage"

type MovieDetails = {
    movieId: number;
    title: string;
    releaseYear: string;
    imageUrl: string;
    // directors: string[];
    // mainCast: string[];
    overview: string;
}

export default function moviePage() {

    // const movie = {
    //     movieId: 12345,
    //     title: 'Movie Title',
    //     releaseYear: '2022',
    //     imageUrl: 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg',
    //     directors: ['Director 1', 'Director 2'],
    //     mainCast: ['Actor 1', 'Actor 2', 'Actor 3'],
    //     overview: 'Movie overview...'
    // }
    const router = useRouter();
    const { movieId } = router.query;
    const [movie, setMovie] = useState<any>(null);

    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    async function fetchMovie() {
        const url = `http://localhost:8000/movies/${movieId}`
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            
            if (response.status === 404) {
                console.log("Movie not found")
                setIsValid(false)
                return
            }
            if (response.ok) {
                console.log("Movie fetched")
                response.json().then((data) => {
                    console.log(data)
                    if (data.data) {
                        console.log(data.message)
                        setIsValid(true)
                        setIsLoading(false);
                        
                        const {id, title, release_date, poster_path, overview} = data.data;
                        setMovie({
                            movieId,
                            title,
                            release_date,
                            imageUrl: "https://image.tmdb.org/t/p/w500" + poster_path,
                            overview
                        });
                    }
                }).catch(error => {
                    
                    console.log(error.message)
                    // handle the error
                })
            } 

        }).catch(error => {
            console.log(error.message)
            // handle the error
        })
    }

    useEffect(() => {
        console.log(movieId, isValid)
        if (movieId) {
            fetchMovie()
            return
        }
        
    }, [movieId, isValid])

    

    
    return (
        
        <div>
            <Navbar></Navbar>
            <h1>{movieId}</h1>
            {isValid ? (
            <>
                <MovieInfoPage {...movie}></MovieInfoPage>
            </>
            ) : (
                <p>Movie not found.</p>
            )}
            
        </div>
    )
}