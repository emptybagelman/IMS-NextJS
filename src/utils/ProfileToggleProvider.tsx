"use client"

import { createContext, useContext, useState } from "react";

type toggle = "comments" | "rooms" | "likes"

const ProfileContext = createContext({
    expandContainer: "rooms",
    setExpandContainer: (value: toggle) => {}
})

export function ProfileToggleProvider({children}: {children: React.ReactNode}){
    const [expandContainer, setExpandContainer] = useState<toggle>("rooms")

    return (
        <ProfileContext.Provider value={{expandContainer, setExpandContainer}}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfileToggle = () => useContext(ProfileContext)