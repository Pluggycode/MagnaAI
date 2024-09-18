'use client'
import React, { useContext } from 'react'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { CourseList } from '@/configs/Schema'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import CourseCard from './courseCard'
import Image from 'next/image'
import { UserCourseListContext } from '@/app/_context/UserCourseList'

const UserCourseList = () => {

  const [courseList,setCourseList] = useState([]);

  const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)
  
  const { user } = useUser();
  
  useEffect( () => {
    user && getUserCourse()

  },[user])
  const getUserCourse= async  () => {
    const result = await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result)
    setCourseList(result)
    setUserCourseList(result)
  }
  return (
    <div>
      <h2 className='font-bold text-medium mt-4'>My AI-Courses</h2>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 mt-2 rounded-md">
        {courseList?.length>0?courseList?.map((course,index)=> (
          <CourseCard course={course} key={index} refreshdata={() => getUserCourse()}/>
        ))
      :[1,2,3,4,5].map((item,index) => (
          <div key={index} className="w-full bg-slate-300 animate-pulse rounded-lg h-[270px] mt-5">

          </div>
      ))
      }
      </div>
    </div>
  )
}

export default UserCourseList