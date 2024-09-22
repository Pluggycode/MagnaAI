'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { HomeIcon,Layers,ShieldPlus,LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { UserCourseListContext } from '@/app/_context/UserCourseList'



function SideBar() {

  const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)
  const Menu = [

    {
      id: 1,
      name: 'Home',
      icon: HomeIcon,
      path: '/dashboard'
    },
    {
      id: 1,
      name: 'Explore',
      icon: Layers,
      path: '/dashboard/explore'
    },
    {
      id: 1,
      name: 'Upgrade',
      icon: ShieldPlus,
      path: '/dashboard/upgrade'
    },
    {
      id: 1,
      name: 'LogOut',
      icon: LogOut,
      path: '/dashboard/logout'
    }
   ]
   const path =usePathname();

  return (
    
    <div className='fixed  h-full md:w-64 p-5 shadow-md'>
      <Image src={'/ai1.png'} width={30} height={10} alt='logo'/>
      <hr className="my-5" />
      <ul>
        {Menu.map((item,index)=>(
          <Link href={item.path}>
          <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-300 te rounded-lg mb-2 
          ${item.path==path && 'bg-gray-300 text-black'}`}>
            <h2 className='text-center ml-15'>{item.name}</h2>
          </div>
          </Link>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%] ">
        <Progress value={(userCourseList?.length/5)*100} className="bg-gradient-to-r from-green-100 to-sky-400 text-white"/>
        <h2 className='text-sm my-2'>{userCourseList?.length} out 5 course is created</h2>
        <h2 className='text-xs text-gray-500'>Upgrade your plan for unLimited course generation</h2>
      </div>
    </div>
  )
}

export default SideBar
