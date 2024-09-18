import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContext } from 'react'
import { UserInputContext } from '@/app/_context/UserInputContext'

import React from 'react'

const TopicDesc = () => {

  const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);
  const handleInputChange=(fieldName,value) =>{

    setUserCourseInput(prev=>({
      ...prev,
      [fieldName]:value
    }))
  }
  return (
    <div className='mx-20 mt-5 lg:mx-44'>
        {/* topic */}
        <div className="mt-5">
            <label htmlFor="">Write the topic for which you want to Generate a course (e.g.., Python course, Yoga, etc..):</label>
            <Input placeholder="Topic" defaultValue={userCourseInput?.topic}
            onChange={(e) =>handleInputChange('topic',e.target.value)} className="h-14 text-xl"/>
        </div>
        <div className="mt-5">
            <label htmlFor="">Tell us more about your course, what you want to include in the course </label>
            <Textarea placeholder='About your course'
            defaultValue={userCourseInput?.description} 
            onChange={(e) =>handleInputChange('description',e.target.value)} 
              className="h-24 text-xl"/>
        </div>

        {/* text area */}
    </div>
  )
}

export default TopicDesc