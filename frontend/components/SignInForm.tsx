import {useState} from 'react';
import {useRouter} from "next/router"
import Cookies from "js-cookie"

export default function SignInForm() {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("sent something")

        fetch("http://localhost:8000/users/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return response.json().then(data => {
                    throw {messages: data.message, code: 400}
                })
                    
            } 
        }).then((data) => {
            alert("successful sign in")
            localStorage.setItem('accessToken', data.accessToken);
            router.push("/")
        }).catch((error) => {
            
            console.log(error.messages)
            alert("there are issues with your input")
        })
    };


    return (
      <>
        <div className="min-h-screen bg-gray-100">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="m-6 text-center text-4xl font-bold text-gray-900">
                            Sign up for an account!
                        </h2>
                        <p className="mt-2 text-center text-lg text-gray-600">
                            Or {' '}
                            <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                click here {" "}
                            </a>
                            if you have not signed up for an account!
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSignin}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm">
                            <div className="my-5">
                                <label htmlFor="email-address" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                            
                            <div className="my-5">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                            
                        </div>
            
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                                </label>
                            </div>
            
                            <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                            </div>
                        </div>
            
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Sign Up
                            </button>
                        </div>
                </form> 
                </div>
            </div>  
        </div>
      </>
    )
  }