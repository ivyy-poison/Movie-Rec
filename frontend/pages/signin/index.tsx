import Navbar from "../../components/Navbar"
import SignInForm from "../../components/SignInForm"
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
            <SignInForm></SignInForm>
        </div>
    )
}