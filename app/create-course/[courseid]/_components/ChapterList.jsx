import React from 'react'
import { GoClock } from "react-icons/go";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import EditChapters from './EditChapters';

const ChapterList = ({ course,refreshData,edit=true }) => {
  return (
    <div className='mt-5'>
      <h2 className='font-medium text-xl'>Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.chapters.map((chapter,index) => [
          <div className="border p-5 rounded-lg mb-2 shadow-md flex items-center justify-between">
          <div className="flex gap-4 items-center ">
            <h2 className='bg-primary flex-none  h-10 w-10 rounded-full text-center p-2'>{index+1}</h2>
            <div className="">
              <h2 className='font-medium text-lg'>{chapter.chapterName} {edit &&<EditChapters course={course} index={index} refreshData={() => refreshData(true)}/>} </h2>
              <p className='text-sm text-gray-500'>{chapter.about}</p>
              <p className='flex gap-2 text-primary'> <GoClock className='mt-1'/>{chapter.duration}</p>
            </div>
          </div>
          < IoIosCheckmarkCircleOutline className='text-4xl text-gray-300 flex-none'/>
          </div>
        ])}
      </div>
    </div>
  )
}

export default ChapterList