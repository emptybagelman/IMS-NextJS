"use client"

import styles from "../styles.module.scss"
import { useRouter } from "next/navigation";
import LazyImage from "@/components/LazyLoadImage";

export default function RoomCard({room}: any){

    const router = useRouter()

    function redirect(id: string){
        router.push(`/explore/${room.category}?roomid=${id}`)
    }

    return (
        <div className={styles.profile_card_wrapper} onClick={() => redirect(room?.id)}>
            {/* <img className={styles.image} src={room?.src} alt={room?.alt} /> */}
            <LazyImage src={room?.src} alt={room?.alt}/>
            <div className={styles.item_caption} >
                <h2>{room?.name.split("_").join(" ")}</h2>
            </div>
        </div>
    )
}