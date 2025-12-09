import type React from "react"
import {auth} from "../services/firebase"
import { onAuthStateChanged , signInWithEmailAndPassword , signOut as fbSignOut} from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"


type AuthContextType = {
    user : any | null 
    loading : boolean
    signIn : (email : string , password : string) => Promise<any>
    signOut : () => Promise<void>
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [user , setUser] = useState<any|null>(null)
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(u) => {
            setUser(u)
            setLoading(false)
        })
        return unsubscribe
    },[])

    const signIn = (email : string , password : string) => signInWithEmailAndPassword(auth,email,password)
    const signOut = () => fbSignOut(auth)

    return <AuthContext.Provider value={{user,loading,signIn,signOut}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("useAuth must be used within Authprovider")
        return ctx
}