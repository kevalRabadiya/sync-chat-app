import { SignIn} from '@clerk/nextjs'

export default function Home() {
  return (
     <div className='h-full w-full flex justify-center items-center'>
       <SignIn/>
     </div>
  )
}
