'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { and } from 'drizzle-orm';
import { CourseList } from '@/configs/Schema';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { MdContentCopy } from "react-icons/md";

const FinishScreen = ({params}) => {

  const { user } = useUser();

    const [course,setCourse] = useState([]);

    const router = useRouter();
    
    useEffect(() => {
        params && getCourse();
    }, [params,user])

    const getCourse = async () => {
            const result2 = await db.select().from(CourseList).where(and(eq(CourseList.courseId,params?.courseid),eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress)));
            setCourse(result2[0]);
            console.log(result2);
    }

  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
      <h2 className='text-center font-bold text-2xl my-3 text-primary'> Congrats ! Your course is Ready.</h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()}/>
      <h2 className='mt-3'>Course URL</h2>
      <h2 className='text-center text-gray-400 rounded-md p-2 border flex gap-5 items-center'>https://magnaai.vercel.app/course/{course?.courseId}/start
      <MdContentCopy className='h-5 w-5 cursor-pointer' onClick={ async () => await navigator.clipboard.writeText('https://magnaai.vercel.app/course/'+course?.courseId+'/start')}/></h2>

    </div>
  )
}

export default FinishScreen
