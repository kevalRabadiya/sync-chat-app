import { Button } from '@/components/ui/Button'
import {SignIn, UserButton} from '@clerk/nextjs'

export default function Home() {
  return (
     <div className='h-full w-full flex justify-center items-center'>
       <UserButton/>
     </div>
  )
}
