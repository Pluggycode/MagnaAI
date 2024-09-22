import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-5 shadow-md'>
       
       <div className="flex gap-2"> <Image src={'/ai1.png'} width={30} height={20} className=''/>
        <h2 className='mt-1 font-bold text-1xl'>Magna-AI</h2>
        </div>
        <UserButton />
    </div>
    
  )
}

export default Header
