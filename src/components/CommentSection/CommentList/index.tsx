"use client"

import { Comment } from "@/utils/interfaces"
import styles from "../styles.module.scss"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
// import getSearchParams from "@/utils/useSearchParams"
import CommentTile from "../CommentTile"
import { useSearchParams } from "next/navigation"

export default function CommentList () {

    const roomid = useSearchParams().get("roomid")

    const {data, isLoading, isError} = useQuery({
        queryKey: ["comments", roomid],
        queryFn: async () => {
            if(!roomid) return;

            const {data} = await axios.get(`https://inspiremyserver.onrender.com/comments/room/${roomid}`)

            const comments = data.data
            return comments as Comment[]
        }
    })

    if(isLoading) return <span>Loading comments...</span>

    if(isError) return <span>Error occurred! Try again in a bit.</span>

    return (
        <div className={styles.comment_array_wrapper}>
            {data?.map(comment => (
                <CommentTile key={comment.id} comment={comment}/>
            ))}
            { data && data?.length < 1 && <div className={styles.no_comments}>No comments yet!</div>}
        </div>
    )
}