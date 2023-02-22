import {useState, useContext} from "react"
import {useRouter} from "next/router"


export default function SignUpForm() {
    const router = useRouter()
 
    // To do: Implement front-end validation of form first before sending to backend


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    
    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("http://localhost:8000/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password, email: email, confirmPassword: confirmPassword})
        }).then((response) => {
            if (response.ok) {
                alert("successful sign in")
                router.push("/signin")
            } else {
                return response.json().then(data => {
                    throw {messages: data.message, code: 400}
                })
                    
            } 
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
                            <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                                click here {" "}
                            </a>
                            if you already have an account
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSignup}>
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
                                    onChange = {(e) => setUsername(e.target.value)}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="my-5">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange = {(e) => setEmail(e.target.value)}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
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
                            <div className="my-5">
                                <label htmlFor="password" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange = {(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>
            
                        
            
                        <div className="py-5">
                            <button
                                type="submit"
                                className="relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-5 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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