import styles from "./styles.module.scss"
import CategoryRoomMiddle from "@/components/CategoryRoomMiddle"
import SearchBar from "@/components/SearchBar"
import { SearchProvider } from "@/utils/searchProvider"


async function getRooms(roomCategory: string){
    const cat = roomCategory.charAt(0).toUpperCase() + roomCategory.slice(1)

    const res = await fetch(`https://inspiremyserver.onrender.com/rooms/${cat}`,{
        next: {revalidate: 10}
    })
    const data = await res.json()
    const rooms = data.data

    for(let room of rooms){
        room.src = `https://res.cloudinary.com/de2nposrf/image/upload/${cat}/${room.user_id}/${room.name}/nz.png`
        room.alt = `Image ID: ${room.id}`
    }

    return rooms
}

export default async function Category({ params }: any){

    const { category } = params || {}
    const rooms = await getRooms(category)

    return (
        <div className={styles.main_wrapper}>
            <SearchProvider>
                <SearchBar category={category}/>
                <div className={styles.page_wrapper}>
                    <CategoryRoomMiddle rooms={rooms}/>
                </div>
            </SearchProvider>
        </div>
    )
}