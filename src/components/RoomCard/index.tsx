"use client"

import styles from "./styles.module.scss"
import { useRouter } from "next/navigation";
import LazyImage from "@/components/LazyLoadImage";


interface RoomCardProps {
    room: {
        id: number;
        name: string;
        dimensions: string;
        description: string;
        theme: string;
        category: string;
        user_id: number;
        fetchUID: string;
        src: string | undefined;
        alt: string | undefined;
    };
    hovered?: any;
    setHovered?: React.Dispatch<React.SetStateAction<any>>;
  }

export default function RoomCard({ room, hovered, setHovered }: RoomCardProps){

    const router = useRouter()

    function onHover(id:number){
        setHovered && setHovered({ ...hovered, hoveredId: id })
    }
    function offHover(){
        setHovered && setHovered({ ...hovered, hoveredId: null })
    }
    function clickRoom(){
        setHovered && setHovered({ ...hovered, roomClicked: room })
        router.push(`?roomid=${room?.id}`)
    }

    return (
        <div 
        className={styles.room_container}
        onMouseEnter={() => onHover(room.id) }
        onMouseLeave={offHover}
        onClick={clickRoom}
        >
            {/* <img className={styles.image} src={room.src} alt={room.alt} /> */}
            {room.src && <LazyImage src={room.src} alt={"alt"}/> }

            {/* div > img + img  */}


            <div className={styles.item_caption}>
                <h2>{room.name.split("_").join(" ")}</h2>

                { 
                hovered?.hoveredId === room.id ?
                    <>
                        <p>Dimensions: {room.dimensions}</p>
                        <p>Description: {room.description}</p>
                        <p>Theme: {room.theme}</p>
                    </>

                    : ""
                }

            </div>
        </div>
    )
}