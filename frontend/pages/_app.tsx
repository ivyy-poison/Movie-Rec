import '../styles/globals.css'
import { createContext, useState } from 'react'
import type { AppProps } from 'next/app'


// export const LoginContext = createContext({
//   loggedIn: false,
//   setLoggedIn: (value: boolean) => {},
//   user: null,
//   setUser: (value: any) => {}
// })



export const LoginContext = createContext<any>(null)


export default function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const value = {loggedIn, setLoggedIn, user, setUser}
  return (
    <LoginContext.Provider value={value}>
      <Component {...pageProps} />
    </LoginContext.Provider>
  )
  
  
} 
