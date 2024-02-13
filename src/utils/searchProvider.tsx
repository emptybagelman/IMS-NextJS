"use client"

import { createContext, useContext, useState} from "react";

const SearchContext = createContext()

export function SearchProvider({children}: {children: React.ReactNode}){
    const [searchRooms, setSearchRooms] = useState()

    return (
        <SearchContext.Provider value={{searchRooms, setSearchRooms}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext)