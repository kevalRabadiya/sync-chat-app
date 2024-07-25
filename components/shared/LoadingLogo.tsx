import Image from "next/image";

type Props = {
    size?:number;
}

const loadingLogo = ({size=100}:Props)=>{
  return (
  <div className="h-full w-full flex justify-center items-center ">
        <Image src="/logo.svg" alt="Logo" width={size} height={size} className="animate-pulse duration-800"/>
  </div>
  )
}

export default loadingLogo  