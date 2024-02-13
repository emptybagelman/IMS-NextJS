"use client"

import styles from "../styles.module.scss"
import useAuthStore from "@/utils/authStore"
import { useCallback, useEffect, useState } from "react"
import { User } from "@/utils/interfaces"

export default function ProfileTop(){

    const { user } = useAuthStore()
    const [data, setData] = useState<User | null>(null)

    const getUserData = useCallback( async () => {
        if(user){
            const res = await fetch(`https://inspiremyserver.onrender.com/users/${user}`)
            const data = await res.json()
            
            setData(data.data)
        }
    },[user])


    useEffect(() => {
        getUserData()
    },[getUserData])
    

    return (

        <section className={styles.top_bar}>
            <div>
                <img src={data?.avatar_image} alt="" />
                <div>
                    <h3>{data?.username}</h3>
                    <span>{data?.email}</span>
                </div>
            </div>
            <span>Settings</span>
        </section>

    )
}