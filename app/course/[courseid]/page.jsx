'use client'
import Header from '@/app/_components/Header'
import ChapterList from '@/app/create-course/[courseid]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseid]/_components/CourseBasicInfo'
import CourseDetails from '@/app/create-course/[courseid]/_components/CourseDetails'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/Schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Course = ({params}) => {
  const [course,setCourse] = useState([]);

  useEffect(() => {
    params && GetCourse();
  },[params])

  const GetCourse = async () => {
    const result = await db.select().from(CourseList).where(eq(CourseList.courseId,params?.courseid))
    setCourse(result[0]);
    console.log(result);
  }

  return (
    <div>
      <Header />
      <div className="px-10 p-10 md:px-20 lg:px-44">
       <CourseBasicInfo course={course} edit={false}/>

       <CourseDetails course={course} />

       <ChapterList course={course} edit={false}/>
       </div>
    </div>
  )
}

export default Course