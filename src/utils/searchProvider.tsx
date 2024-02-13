"use client"

import { createContext, useContext, useState } from "react";

interface ContextValue {
    searchRooms: string | undefined;
    setSearchRooms: (value: string | undefined) => void;
}

const SearchContext = createContext<ContextValue>({
    searchRooms: undefined,
    setSearchRooms: () => {}
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [searchRooms, setSearchRooms] = useState<string | undefined>();

    return (
        <SearchContext.Provider value={{ searchRooms, setSearchRooms }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearchContext = () => useContext(SearchContext);
