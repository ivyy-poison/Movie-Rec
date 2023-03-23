import { useRouter } from 'next/router'
import Navbar from "../../components/Navbar";
import { useState, useContext, useEffect } from 'react'
import StarRatings from 'react-star-ratings';
import { LoginContext } from '../_app';
import MovieInfoPage from "../../components/MovieInfoPage"
import RatedMovieCard from '../../components/RatedMovieCard'



export default function DashboardPage() {
    const router = useRouter()
    const {loggedIn, user } = useContext(LoginContext)
    const [isInitialised, setIsInitialised] = useState(false)
    useEffect(() => {
        if (!isInitialised) {
          return
        }
        if (!loggedIn) {
          router.push('/')
        }
    }, [loggedIn, isInitialised])

    useEffect(() => {
        setIsInitialised(true)
    }, [loggedIn])


    return (
        <>
            <Navbar />
            <RatedMovieCard />  

        </>
    )
}