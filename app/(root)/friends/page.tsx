import ConversationFallback from '@/components/shared/conversation/ConversationFallback';
import ItemList from '@/components/shared/item-list/ItemList';
import React from 'react'
import AddFriendDailog from './_components/AddFriendDailog';

type Props = {}

const FriendPage = (props:Props) => {
  return (
    <>
     <ItemList title="Friends" action={<AddFriendDailog/>}>Friends Page</ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendPage;