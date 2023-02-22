import type { NextPage } from 'next'
import { Fragment, useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MovieCard from '../components/MovieCard'


const Home: NextPage = () => {

  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popularMovies, setPopularMovies] = useState<any>([]);

  // fetch("http://localhost:8000/movies/popular", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   }}).then((response) => {
  //     if (response.ok) {
  //       response.json().then(data => {
  //         setPopularMovies(data.results)
  //         console.log(data.results)
  //       })
  //     } else {
  //       throw {messages: "error", code: 400}
  //   }}).catch((error) => {
  //     console.log(error.messages)
  // })
  useEffect(() => {
    async function fetchPopularMovies() {
      const response = await fetch("http://localhost:8000/movies/popular", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }})
      const data = await response.json()
      setPopularMovies(data.results)
    }
    console.log("here")
    fetchPopularMovies()
    console.log(popularMovies)
  }, [])
    


  const displayPopularMovies = popularMovies.map((movie: any) => {
    return (
      <div className="">
        <MovieCard
          title={movie.title}
          imageUrl={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
          releaseYear={movie.release_date.slice(0, 4)}
        ></MovieCard>
      </div>

    )
    
  })

  return (
    <>

    <Navbar></Navbar>
    <Hero></Hero>
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>MovieRec</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold pb-20">Find out what's popular</h1>
        <div className="flex flex-wrap gap-4 justify-center items-center"> 
          {displayPopularMovies}
          
        </div>
        
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
    </>
  )
}

export default Home
