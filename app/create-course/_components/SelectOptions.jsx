import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext'


const SelectOptions = () => {
    const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);
    const handleInputChange=(fieldName,value) =>{

        setUserCourseInput(prev=>({
          ...prev,
          [fieldName]:value
        }))
      }


    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className="grid grid-cols-2 gap-10">
               <div className="">
                <label htmlFor="" className='text-sm'>Difficulty Level</label>
               <Select 
                defaultValue={userCourseInput?.level}
               onValueChange={(value) => handleInputChange('level',value)}>
                    <SelectTrigger className=''>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Beginer">Beginer</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advance">Advance</SelectItem>
                    </SelectContent>
                </Select>
               </div>
               <div className="">
                <label htmlFor="" className='text-sm'>Course Duration</label>
               <Select 
               defaultValue={userCourseInput?.duration}
               onValueChange={(value) => handleInputChange('duration',value)}>
                    <SelectTrigger className=''>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1 hour">1 hour</SelectItem>
                        <SelectItem value="I2 hours">2 hours</SelectItem>
                        <SelectItem value="more than 3 hours">more than 3 hours</SelectItem>
                    </SelectContent>
                </Select>
               </div>
               <div className="">
                <label htmlFor="" className='text-sm'>Display Video</label>
               <Select 
               defaultValue={userCourseInput?.displayVideo}
               onValueChange={(value) => handleInputChange('displayVideo',value)}>
                    <SelectTrigger className=''>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                </Select>
               </div>
               <div className="">
                <label htmlFor="" className='text-sm'>Number of chapter</label>
               <Input type="number" 
               defaultValue={userCourseInput?.noOfChapter}
               onChange={(event) => handleInputChange('noOfChapter',event.target.value)}></Input>
               </div>



            </div>
        </div>
    )
}

export default SelectOptions