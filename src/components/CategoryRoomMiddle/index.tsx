"use client"

interface Hovered {
    hoveredId: number | null,
    roomClicked: number | null,
}

import { useState } from "react";
import RoomCard from "../RoomCard";
import RoomOverlay from "../RoomOverlay";
import { useSearchParams } from "next/navigation";
import { Room } from "@/utils/interfaces";
import { useSearchContext } from "@/utils/searchProvider";

export default function CategoryRoomMiddle({ rooms }: any){

    const [ hovered, setHovered ] = useState<Hovered>({ hoveredId: null, roomClicked: null })
    const router = useSearchParams().get("roomid")
    const { searchRooms } = useSearchContext()

    return (
        <>
            {searchRooms ? searchRooms?.map((room:any,index: number) => (
                <RoomCard key={index} room={room} hovered={hovered} setHovered={setHovered}/>
                ))
                :
                rooms.map((room:any,index: number) => (
                    <RoomCard key={index} room={room} hovered={hovered} setHovered={setHovered}/>
                    )) 
            }
            {hovered.roomClicked !== null || router ?
                <RoomOverlay hovered={hovered} setHovered={setHovered} />
                : ""
            }
        </>
    )
}