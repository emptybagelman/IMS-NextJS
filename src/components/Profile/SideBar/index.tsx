"use client"

import useAuthStore from "@/utils/authStore"
import styles from "../styles.module.scss"
import { useCallback, useEffect, useState } from "react"
import { Room, Comment } from "@/utils/interfaces"
import { useProfileToggle } from "@/utils/ProfileToggleProvider"
import ExpandCollapseWidget from "@/components/ExpandCollapseWidget"
import CommentTile from "@/components/CommentSection/CommentTile"

function convertDate(date:string){
    let parsedDate = new Date(date)
    const options: Intl.DateTimeFormatOptions = {day: "2-digit", month:"2-digit", year:"2-digit"}

    return parsedDate.toLocaleDateString("en-GB",options)
}

function RoomName(room_id: any){
    const[name,setName] = useState<Room>()
    useEffect(() => {
        async function getName(params: any){
            const res = await fetch(`https://inspiremyserver.onrender.com/rooms/${params.room_id}`)
            const data = await res.json()
            setName(data.data)
        }
        getName(room_id)
    },[room_id])
    
    return <span className={styles.room_name}>{ name?.name.split("_").join(" ") }</span>
}

export default function SideBar(){

    const { user } = useAuthStore()
    const { expandContainer }: any = useProfileToggle()
    const [comments,setComments] = useState<Comment[]>()

    const getComments = useCallback(async () => {
        const res = await fetch(`https://inspiremyserver.onrender.com/comments/users/${user}`)
        const data = await res.json()
        setComments(data.data)
    },[user])

    useEffect(() => {
        getComments()
    },[getComments])

    return (
        <section className={styles.sidebar} style={expandContainer === "comments" ? {"gridColumn": "span 2"} : {"gridColumn": "1"}}>
            <ExpandCollapseWidget tab="comments"/>
            <h3>Your Comments</h3>
            <div>
                {
                    comments ?
                    comments.map((c:Comment, index:number) => (
                        <CommentTile key={c.id} comment={c}/>
                    ))
                    : ""
                }
            </div>

        </section>
    )
}