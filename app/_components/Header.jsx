import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-md'>
        <Image src={'/ai1.png'} width={35} height={15}/>
        <Link href={'/dashboard'}><Button className="hover:bg-black">Get Started</Button></Link>
    </div>
  )
}

export default Header