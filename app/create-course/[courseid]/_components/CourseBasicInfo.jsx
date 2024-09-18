import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { useState } from 'react';
import { storage } from '@/configs/FirebaseConfig';
import { uploadBytes,ref, getDownloadURL } from 'firebase/storage';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/Schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';


const CourseBasicInfo = ({course,refreshData,edit=true}) => {

  const [selectedFile, setSelectedFile] = useState ();

  useEffect(() => {

    if(course)
    {
      setSelectedFile(course?.courseBanner)
    }

  },[course])
  /**
   * select file and upload to database
   * @param {*} event 
   */

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));

    const fileName = Date.now()+'jpg';
    
    const storageRef= ref(storage,'/ai-course/'+fileName);

    await uploadBytes(storageRef,file).then((snapshot) => {
      console.log("uploadfile completed")
    }).then(res => {
      getDownloadURL(storageRef).then(async(downloadUrl) => {
        console.log(downloadUrl);
        await db.update(CourseList).set({
          courseBanner:downloadUrl
        }).where(eq(CourseList?.id,course?.id));
      })
    })

    console.log(file);
  }
  return (
    <div className='p-10 border rounded-xl shadow-md mt-5'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="">
          <h2 className='font-bold text-2xl '>{course?.courseOutput?.courseName} {edit &&<EditCourseBasicInfo course={course} refreshData={() => refreshData(true)}/>} </h2>
          <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.description}</p>
          <h2 className='font-bold text-primary flex gap-1 mt-1'><HiOutlinePuzzlePiece className='mt-1'/>{course?.category}</h2>
          {!edit &&<Link href={'/course/'+course?.courseId+'/start'}><Button className="w-full mt-2">Start</Button></Link>}
        </div>
        <div className="rounded-md">
          <label htmlFor="upload-image">
          <Image src={ selectedFile?selectedFile:"/boo4.jpg"} width={300} height={300} className='w-full rounded-xl h-[300px] object-cover cursor-pointer' />
          {edit && <input type="file" id='upload-image' className='opacity-0' onChange={onFileSelected}/>}
          </label>
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo