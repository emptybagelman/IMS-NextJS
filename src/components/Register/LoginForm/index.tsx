"use client"

import React,{ useState } from "react"
import useAuthStore from "@/utils/authStore"
import { useRouter } from "next/navigation"

export default function LoginForm(){

    const { login } = useAuthStore()
    const router = useRouter()
    const [loginForm, setLoginForm] = useState({
        username:"",
        password:""
    })

    const Login = async (e:any) => {
        e.preventDefault()

        try {
            await login(loginForm).then(resp => {
                router.push("/")
            })
        } catch (error) {
            console.error("Problem logging in,", error)
        }
    }

    function handleInput(e:any){
        setLoginForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <form onSubmit={Login}>
            <label htmlFor="username">Username</label>
            <input name="username" onChange={handleInput} type="text" placeholder=">" required/>

            <label htmlFor="password">Password</label>
            <input name="password" onChange={handleInput} type="password" placeholder=">" required/>

            <button type="submit">Enter</button>

            <span>Haven't made an account?
                <a href="/signup">Sign up here!</a>
            </span>

        </form>
    )

}