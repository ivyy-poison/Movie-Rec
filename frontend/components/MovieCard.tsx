import {Fragment, useState, useRef, useContext} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LoginContext } from '../pages/_app';
import StarRatings from 'react-star-ratings'


type movieCardDetails = {
    movieId: Number;
    title: string;
    imageUrl: string;
    releaseYear: string;
    overview: string;
}

export default function MovieCard(props: movieCardDetails) {

    const cancelButtonRef = useRef(null)
    const [open, setOpen] = useState(false)

    const [rating, setRating] = useState(0)

    const movieId = props.movieId
    const title = props.title
    const imageUrl = props.imageUrl
    const releaseYear = props.releaseYear
    const overview = props.overview

    const {loggedIn, setLoggedIn, user, setUser} = useContext(LoginContext)

    // function updateRating()

    async function handleRate() {
        console.log("submitted rating of " + rating)
        console.log(movieId, user.id, rating)
        fetch("http://localhost:8000/movies/rate", {
            method: "POST",
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

    

    return (
        <>
            
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="flex basis-1/4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-80 sm:w-10 ">
                                            {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                            <img className="w-80 h-80 object-contain object-fit-center" src={imageUrl} alt={title} />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-4xl font-semibold leading-6 text-gray-900 ">
                                                {title}
                                            </Dialog.Title>
                                            <div className="mt-6">
                                                <p className="text-2xl">{releaseYear}</p>
                                                <p className="text-md pt-5 text-gray-500">
                                                    {overview}
                                                </p>
                                            </div>
                                            {(loggedIn) && (
                                                <div className="mt-6 sm:flex sm:flex sm:flex-row-reverse sm:px-8 sm:pt-8">
                                                    <StarRatings
                                                        rating={rating}
                                                        starRatedColor="blue"
                                                        changeRating={(v:number) => setRating(v)}
                                                        numberOfStars={6}
                                                        name='rating'
                                                    />
                                                    
                                                </div>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                                {(rating > 0) && (
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleRate}
                                    >
                                    Rate
                                </button>
                                )
                                }
                                
                                </div>
                            </Dialog.Panel>
                            
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="max-w-sm rounded overflow-hidden shadow-lg w-64 h-88" onClick={() => setOpen(true)}>
                <div className="object-contain">
                    <img className="w-80 h-80 object-contain object-fit-center" src={imageUrl} alt={title} />
                    <div className="p-4">
                        <h3 className="text-gray-700 font-semibold">{title} ({releaseYear})</h3>
                    </div>
                </div>
            </div>
        </>
    )
}
