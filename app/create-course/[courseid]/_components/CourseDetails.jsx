import React from 'react'
import { GoClock } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";

const CourseDetails = ({course}) => {
  return (
    <div className='border p-6 rounded-xl shadow-md mt-3'>
        <div className="grid grid-cols-2 md:grid-cols-4 ">
            <div className="flex gap-2"><BsBarChart  className='text-4xl text-primary mt-1'/>
            <div className="f">
                <h2 className='text-xs text-gray-500'>Skill level</h2>
                <h2 className='font-medium text-lg'>{course?.level}</h2>
            </div>
            </div>
            <div className="flex gap-2"><GoClock className='text-4xl text-primary mt-1'/>
            <div className="f">
                <h2 className='text-xs text-gray-500'>Duration</h2>
                <h2 className='font-medium text-lg'>{course?.courseOutput?.duration}</h2>
            </div>
            </div>
            <div className="flex gap-2"><IoBookOutline className='text-4xl text-primary mt-1'/>
            <div className="f">
                <h2 className='text-xs text-gray-500'>NO of chapters</h2>
                <h2 className='font-medium text-lg'>{course?.courseOutput?.noOfChapters}</h2>
            </div>
            </div>
            <div className="flex gap-2"><IoVideocamOutline  className='text-4xl text-primary mt-1'/>
            <div className="f">
                <h2 className='text-xs text-gray-500'>Video Included!</h2>
                <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
            </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetails