"use client"

import React,{ useState } from "react"
import useAuthStore from "@/utils/authStore"
import { useRouter } from "next/navigation"


export default function SignupForm(){

    const { register } = useAuthStore()
    const router = useRouter()
    const [loginForm, setLoginForm] = useState({
        username:"",
        email: "",
        password:"",
        confPassword:""
    })

    function handleInput(e:any){
        setLoginForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const Signup = async (e:any) => {
        e.preventDefault()

        try{

            const data = {
                username: loginForm.username,
                email: loginForm.email,
                password: loginForm.password
            }

            await register(data).then(resp => {
                router.push("/login")
            })
        } catch (error) {
            console.error("Error signing up", error)
        }
    }

    return (
        <form onSubmit={Signup}>
            <label htmlFor="username">Username</label>
            <input name="username" onChange={handleInput} type="text" placeholder=">" required/>

            <label htmlFor="email">Email</label>
            <input type="email" onChange={handleInput} name="email" id="email_input" placeholder=">" required/>

            <label htmlFor="password">Password</label>
            <input name="password" onChange={handleInput} type="password" placeholder=">" required/>

            <label htmlFor="confPassword">Confirm Password</label>
            <input name="confPassword" onChange={handleInput} type="password" placeholder=">" required/>

            <button type="submit">Register</button>

            <span>Already have an account?
                <a href="/login">Log in!</a>
            </span>

        </form>
    )
}