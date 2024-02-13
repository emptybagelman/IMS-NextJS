"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./styles.module.scss"
import useAuthStore from "@/utils/authStore"

export default function SmallNavBar(){

    const [open, setOpen] = useState(false)
    const { isAuthenticated, logout } = useAuthStore()


    return (
        <div>
            <nav className={styles.nav_row}>
                { open === false ? <img onClick={() => setOpen(true)} src='https://res.cloudinary.com/de2nposrf/image/upload/v1697042188/static/small_logo.png' alt="navigation" /> : ""  }
                {
                    open === true ?
                    <ul className={open === true ? styles.open_menu : styles.close_menu}>
                        <span onClick={() => setOpen(false)}>X</span>
                        <li onClick={() => setOpen(false)}>
                            <Link href="/" >Home</Link>
                        </li>
                        <li onClick={() => setOpen(false)}>
                            <Link href="/explore" >Explore</Link>
                        </li>
                        {
                            isAuthenticated ?

                            <>
                                <li onClick={() => setOpen(false)}>
                                    <Link href="/create">Create</Link>
                                </li>
                                <li onClick={() => setOpen(false)}>
                                    <Link href="/profile" >Profile</Link>
                                </li>
                                <li onClick={() => setOpen(false)}>
                                    <a onClick={logout}>Logout</a>
                                </li>
                            </>


                            : 
                            <li onClick={() => setOpen(false)}>
                                <Link href="/login" >Login</Link>
                            </li>
                        }
                    </ul>
                : ""
                }
            </nav>
        </div>
    )
}