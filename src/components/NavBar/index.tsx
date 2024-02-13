"use client"

import Link from "next/link"
import styles from "./styles.module.scss" 
import { SmallNavBar } from ".."
import { useWindowSize } from "@/utils/windowSize"
import useAuthStore from "@/utils/authStore"
import { useRouter } from "next/navigation"

export default function NavBar(){

    const windowSize = useWindowSize()
    const { isAuthenticated, logout } = useAuthStore()
    const router = useRouter()

    function moveToHome(){
        router.push("/")
    }

// small logo: 'https://res.cloudinary.com/de2nposrf/image/upload/v1697042188/static/small_logo.png'
    return (
        <>
            {
            windowSize.width > 900 ?
                <div>
                    <nav className={styles.nav_row}>

                        <Link href="/">
                            <img id={styles.logo} src="https://res.cloudinary.com/de2nposrf/image/upload/v1697042188/static/logo.png" alt="Inspire My Space" />
                        </Link>

                        <ul>
                            <li>
                                <Link href="/" >Home</Link>
                            </li>
                            <li>
                                <Link href="/explore" >Explore</Link>
                            </li>
                            {
                                isAuthenticated ?

                                <>
                                    <li>
                                        <Link href="/create">Create</Link>
                                    </li>
                                    <li>
                                        <Link href="/profile" >Profile</Link>
                                    </li>
                                    <li>
                                        <a onClick={() => {logout();moveToHome()}}>Logout</a>
                                    </li>
                                </>


                                : 
                                <li>
                                    <Link href="/login" >Login</Link>
                                </li>
                            }
                        </ul>
                    </nav>
                </div>
            :
            <SmallNavBar />
            }
        </>
    )
}