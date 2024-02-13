"use client"

import styles from "./styles.module.scss"
import React, { useEffect, useState } from "react"
import Environment from "../Environment"
import { useRouter, useSearchParams } from "next/navigation"
import { Room } from "@/utils/interfaces"
import CommentSection from "../CommentSection"

export default function RoomOverlay({ hovered, setHovered }: any) {

    // const pageRefs = useRef([React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),])

    const [room,setRoom] = useState<Room>()
    const [imgs,setImgs] = useState<string[]>([])

    const [commentsOpen, setCommentsOpen] = useState<boolean>(false)

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const search = searchParams.get("roomid")
        if(search){
            getRoomData(search)
        }
    },[searchParams])

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    },[commentsOpen])

    function closeOverlay(){
        setHovered({ ...hovered, roomClicked: null })
        router.replace(`?roomid=`)
    }

    async function getRoomData(room_id: string | null){
        const res = await fetch(`https://inspiremyserver.onrender.com/rooms/${room_id}`)
        const data = await res.json()
        const room = data.data
        setRoom(room)
        setImgs([
                `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${room?.category}/${room?.user_id}/${room?.name}/px.png`,
                `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${room?.category}/${room?.user_id}/${room?.name}/nx.png`,
                `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${room?.category}/${room?.user_id}/${room?.name}/py.png`,
                `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${room?.category}/${room?.user_id}/${room?.name}/ny.png`,
                `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${room?.category}/${room?.user_id}/${room?.name}/pz.png`,
                `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${room?.category}/${room?.user_id}/${room?.name}/nz.png`,
            ])
        
    }

    return (
        <div className={styles.env_map_grid} >
            <Environment mapUrls={imgs} roomId={Number(room?.id)} user_id={Number(room?.user_id)} />

            <div className={styles.widget_overlay}>
                <div className={styles.buttons} style={commentsOpen ? {"display":"none"}: {}}>
                    <button onClick={closeOverlay} ><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox="0 0 24 24"><title>close_line</title><g id="close_line" fill='none' fillRule='evenodd'><path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z'/><path fill='#FFFFFFFF' d='m12 13.414 5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586 6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414L12 13.414Z'/></g></svg></button>
                    <button onClick={() => setCommentsOpen(prev => !prev)}><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox="0 0 24 24"><title>comment_2_line</title><g id="comment_2_line" fill='none' fillRule='evenodd'><path d='M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01-.184-.092Z'/><path fill='#FFFFFFFF' d='M4 12a7 7 0 0 1 13.491-2.625 1 1 0 0 0 1.854-.75A9.003 9.003 0 1 0 3.27 16.61l-.78 2.649a1.008 1.008 0 0 0 1.252 1.252l2.65-.78a8.948 8.948 0 0 0 3.485 1.2 1 1 0 1 0 .248-1.985 6.95 6.95 0 0 1-2.88-1.038 1.429 1.429 0 0 0-1.171-.168l-1.152.339.339-1.152c.12-.408.047-.834-.168-1.17A6.962 6.962 0 0 1 4 12Zm16 4.5a3.5 3.5 0 1 0-1.627 2.957 1.26 1.26 0 0 1 .91-.175 1.26 1.26 0 0 1 .174-.91A3.48 3.48 0 0 0 20 16.5ZM16.5 11a5.5 5.5 0 0 1 4.821 8.148l.386 1.311a1.005 1.005 0 0 1-1.248 1.248l-1.31-.386A5.5 5.5 0 1 1 16.5 11Z'/></g></svg></button>
                </div>

                <CommentSection toggle={commentsOpen} setToggle={setCommentsOpen}/>
            </div>

        </div>
    )
}