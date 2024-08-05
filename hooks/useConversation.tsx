'use client'

import { useParams } from "next/navigation"
import { useMemo } from "react"

export const useConversation=()=>{
    const params = useParams()
    const conversationsId = useMemo(()=>{
        params?.conversationsId || ("" as string)
    },[[params?.conversationsId]])

    const isActive = useMemo(()=>
        //@ts-ignore
        !!conversationsId,[conversationsId]
    )
    return {isActive,conversationsId}
}