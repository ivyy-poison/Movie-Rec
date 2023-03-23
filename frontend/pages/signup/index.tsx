import Navbar from "../../components/Navbar"
import SignUpForm from "../../components/SignUpForm"
import { useContext, useEffect } from "react"
import { LoginContext } from '../_app'
import { useRouter } from 'next/router'

export default function signin() {
    const router = useRouter()
    const {loggedIn, user } = useContext(LoginContext)
    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, router])
    
    return (
        <div>
            <Navbar></Navbar>
            <SignUpForm></SignUpForm>
        </div>
    )
}