'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { IoBookOutline } from "react-icons/io5";
import { FiMoreVertical } from "react-icons/fi";
import DropDownOption from './DropDownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/Schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


function CourseCard({ course, refreshdata, displayUser = false }) {

  const handleOnDelete = async () => {
    const res = await db.delete(CourseList)
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList?.id })
    if (res) {
      refreshdata()
    }

  }

  useEffect(() => {

    course && getUserName();

  }, [course])
  const getUserName = async () => {
    const result = await db.select().from(CourseList).where(eq(CourseList?.id, course?.id));
    console.log(result);
  }

  return (
    <div className="shadow-sm rounded-lg border my-4 hover:border-primary p-2 transition-all cursor-pointer">
      <Link href={'/course/' + course?.courseId}>
        <Image src={course?.courseBanner} width={300} height={200}
          className='w-full h-[200px] object-cover' />
      </Link>
      <div className="p-2">
        <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseOutput?.courseName}
          {!displayUser &&<DropDownOption handleOnDelete={() => handleOnDelete()}><FiMoreVertical /></DropDownOption>}
        </h2>
        <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className='flex gap-2 items-center p-1 bg-green-100 text-primary text-sm rounded-sm'><IoBookOutline />{course?.courseOutput?.noOfChapters} chapters</h2>
          <h2 className='text-sm  bg-green-100 text-primary p-1 rounded-sm'>{course?.level}</h2>
        </div>
        {displayUser && <div className="flex gap-2 items-center mt-2">
          <Image src={course?.userProfileImage} width={25} height={25} className='rounded-full' />
          <h2 className='text-sm font-medium'>{course?.userName}</h2>
        </div>}
      </div>
    </div>

  )
}

export default CourseCard