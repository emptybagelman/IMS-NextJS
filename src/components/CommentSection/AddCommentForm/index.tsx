"use client"

import { useState, useCallback, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import useAuthStore from "@/utils/authStore"
import { User, Comment } from "@/utils/interfaces"
// import getSearchParams from "@/utils/useSearchParams"
import { useSearchParams } from "next/navigation"
import { useWindowSize } from "@/utils/windowSize"

export default function AddCommentForm() {

    const windowSize = useWindowSize()
    const queryClient = useQueryClient()

    const { user } = useAuthStore()
    const [data, setData] = useState<User>()
    const roomid = useSearchParams().get("roomid")

    const [formInput, setFormInput] = useState<string | undefined>()

    // const [formData, setFormData] = useState<Comment | null>(null)

    const getUserData = useCallback( async () => {
        if(user){
            const res = await fetch(`https://inspiremyserver.onrender.com/users/${user}`)
            const data = await res.json()
            
            setData(data.data)
        }
    },[user])


    useEffect(() => {
        getUserData()
    },[roomid])

    const { mutate: submit, } = useMutation({
        mutationFn: async () => {

            const formData = {
                "comment": formInput,
                "initial_comment": true,
                "username": data?.username,
                "user_id": user,
                "room_id": roomid,
                "parent_id":null,
                "root_id":null
            }

            await axios.post("https://inspiremyserver.onrender.com/comments",formData, {
            headers: {
                "Content-Type":"application/json"
            }
            
        })},
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["comments"]})
            setFormInput("")
        }
    })

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        submit()
    }

    return (
        <form>
            <label htmlFor="textarea">Add Comment:</label>
            <textarea
                name="textarea"
                id="comment_input"
                cols={windowSize.width/30}
                rows={3}
                placeholder=">"
                value={formInput}
                onChange={e => setFormInput(e.target.value)}
                maxLength={80}
                >
            </textarea>

            <button onClick={handleSubmit}>Post</button>
        </form>
    )
}