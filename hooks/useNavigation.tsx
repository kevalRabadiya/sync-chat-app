'use client'

import { MessageSquare, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"


export const useNavigation = ()=>{
    const pathname = usePathname()
    
    const paths = useMemo(()=>
        [
            {
                name:'conversation',
                href:'/conversation',
                icon:<MessageSquare/>,
                active:pathname.startsWith('/conversation')
            },
            {
                name:'friends',
                href:'/friends',
                icon:<Users/>,
                active:pathname === '/friends'
            }
        ],[pathname]
    )
    return paths;
}