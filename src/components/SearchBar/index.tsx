"use client"

import { useState } from "react"
import styles from "./styles.module.scss"
import useDebounce from "@/utils/debounce"
import axios from "axios"
import { Room } from "@/utils/interfaces"
import { useSearchContext } from "@/utils/searchProvider"

export default function SearchBar({category}: {category:string}){

    const [searchInput, setSearchInput] = useState<string>("")
    const debouncedInput = useDebounce(searchInput, 500)
    const { setSearchRooms } = useSearchContext()

    async function handleSearch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        // pass filtered values up to parent / render them on page. Could redirect to a regular search page??
        e.preventDefault()
        const {data} = await axios.get("https://inspiremyserver.onrender.com/rooms")
        const filteredByCategory = data.rooms.filter((r:Room) => r.category.toLowerCase() === category) 
        const filteredByInput = filteredByCategory.filter((r:Room) => r.name.toLowerCase().includes(searchInput.toLowerCase()))

        for(let room of filteredByInput){
            room.src = `https://res.cloudinary.com/de2nposrf/image/upload/${category}/${room.user_id}/${room.name}/nz.png`
            room.alt = `Image ID: ${room.id}`
        }

        setSearchRooms(filteredByInput)
    }

    function clearSearch(){
        setSearchInput("")
        setSearchRooms()
    }

    return (
        <div className={styles.searchbar_wrapper}>
            <form>
                <input type="text" placeholder=">" id={styles.explore_input} value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
                <div>
                    <button onClick={handleSearch}>Search</button>
                    { searchInput.length > 0 && 
                    <span onClick={clearSearch} className={styles.clear_search_input}>X</span>
                    }
                </div>
            </form>
        </div>
    )
}