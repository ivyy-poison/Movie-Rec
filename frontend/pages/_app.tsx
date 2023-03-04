import '../styles/globals.css'
import { createContext, useState, useEffect } from 'react'
import type { AppProps } from 'next/app'

export const LoginContext = createContext<any>(null)

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const value = {loggedIn, setLoggedIn, user, setUser}

  useEffect(() => {
      setLoggedIn(localStorage.accessToken ? true : false);
  }, []);

  useEffect(() => {
    console.log("loggedIn changed to " + loggedIn)
    fetch("http://localhost:8000/users/dashboard", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((response) => {
      if (response.ok) {
          response.json().then(user => {
              setUser({username: user.username, email: user.email, id: user.id})
          })
      } else {
          return response.json().then(data => {
              throw {messages: data.message, code: 400}
          })      
      }
    }).catch((error) => {
        console.log("Test")
        // This means access token either not exist or expired
    })
  }, [loggedIn])


  return (
    <LoginContext.Provider value={value}>
      <Component {...pageProps} />
    </LoginContext.Provider>
  )  
} 
