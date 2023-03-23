import React from "react"
import StarRatings from "react-star-ratings"
import Link from 'next/link'

export default function RatedMovieCard() {

    const imageUrl = 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg'
    const title = 'Movie Title'
    const releaseDate = '2022'
    const rating = 4

    return (
        <div className="w-64 bg-white rounded-lg overflow-hidden shadow-lg">
        <img
            className="w-full h-64 object-cover"
            src={imageUrl}
            alt={title}
        />
        <div className="p-4">
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-gray-700 text-base mb-2">
            Release Date: {releaseDate}
            </p>
            <div>
                <p>you rated this movie {rating}/5</p>
            </div>
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right">
            More Info
            </button>
        </div>
        </div>
    );
};

