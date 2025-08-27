import React, { createContext, useContext, useState, useEffect } from "react"
import { IUser } from "@/lib/interfaces"

interface SessionContextType {
    user?: IUser
    setUser: (user: IUser) => void
    logoutUser: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<IUser | undefined>(undefined)

    // Load from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("session-user")
        if (savedUser) {
            setUserState(JSON.parse(savedUser))
        }
    }, [])

    const setUser = (data: IUser) => {
        setUserState(data)
        localStorage.setItem("session-user", JSON.stringify(data))
    }

    const logoutUser = () => {
        setUserState(undefined)
        localStorage.removeItem("session-user")
    }

    return (
        <SessionContext.Provider value={{ user, setUser, logoutUser }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    const ctx = useContext(SessionContext)
    if (!ctx) throw new Error("useSession must be used inside SessionProvider")
    return ctx
}
