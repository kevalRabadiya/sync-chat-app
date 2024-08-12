'use client'

import ConversationFallback from '@/components/shared/conversation/ConversationFallback';
import ItemList from '@/components/shared/item-list/ItemList';
import React from 'react'
import AddFriendDailog from './_components/AddFriendDailog';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Loader2 } from 'lucide-react';
import Request from './_components/Request'

type Props = {}

const FriendPage = (props:Props) => {
  const requests = useQuery(api.requests.get)
  return (
    <>
     <ItemList title="Friends" action={<AddFriendDailog/>}>
     {
       requests? requests.length===0?<p className='w-full h-full flex items-center justify-center'>No friend requests</p>
       :(requests.map((request)=>{
         return <Request key={request.request._id} id={request.request._id} imageUrl={request.sender.imageUrl} username = {request.sender.username} email={request.sender.email}/>
       }))
       : <Loader2 className='h-8 w-8 '/>
     }
     </ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendPage;