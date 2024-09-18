'use client'
import React, { useContext, useEffect, useState } from 'react'
import { IoOptionsOutline } from "react-icons/io5"
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineTopic } from "react-icons/md";
import { Button } from '@/components/ui/button';
import SelectCategoryComponent from './_components/SelectCategoryComponent';
import TopicDesc from './_components/TopicDesc';
import SelectOptions from './_components/SelectOptions';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/Schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CreateCourse = () => {

    const StepperOption =[
        {
            id:1,
            name:"category",
            icon:<BiSolidCategoryAlt />
        },
        {
            id:1,
            name:"Topic & desc",
            icon:< MdOutlineTopic/>
        },
        {
            id:1,
            name:"options",
            icon:<IoOptionsOutline />
        },

    ]
    const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);
    const [Loading,setLoading] = useState(false);
    const [activeIndex,setActiveIndex]=useState(0);
    const {user}=useUser();
    const router = useRouter();

    useEffect(()=>{
        console.log(userCourseInput);
    },[userCourseInput])

        // used to next button enabled or disabled status
    const CheckStatus=()=>{
        if(userCourseInput?.length==0){
            return true;
        }
        if (activeIndex==0 && (userCourseInput?.category?.length==0|| userCourseInput?.category==undefined))
        {
            return true;
        }
        if(activeIndex==1 && (userCourseInput?.topic?.length==0 || userCourseInput?.topic==undefined))
        {
            return true;
        }

        else if(activeIndex==2&&(userCourseInput?.level==undefined || userCourseInput?.duration==undefined || 
            userCourseInput?.displayVideo==undefined || userCourseInput?.noOfChapter==undefined))
            {
                return true;
            }
        return false;

    }

        const GenerateCourseLayout =  async () =>{
            setLoading(true);
        const BASIC_PROMPT = "Generate A Course Tutorial on following Detail With field Course Name, Description, Along with Chapter Name, about,Duration:";
        const USER_INPUT_PROMPT = 'Category:'+userCourseInput?.category+',Topic:'+userCourseInput?.topic+", Level:"+userCourseInput?.level+",Duration:"+userCourseInput?.duration+", NoOfChapter:"+userCourseInput?.noOfChapter+", in JSON format"
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

        console.log(FINAL_PROMPT)

        const result  = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        console.log(result.response?.text())
        console.log(JSON.parse(result.response?.text()))
        setLoading(false);
        saveCourseLayoutInDB(JSON.parse(result.response?.text()));
    }

    const saveCourseLayoutInDB= async(courseLayout) =>{
        var id = uuid4();
        setLoading(true);
        const result=await db.insert(CourseList).values({
            courseId:id,
            name:userCourseInput?.topic,
            level:userCourseInput?.level,
            category:userCourseInput?.category,
            courseOutput:courseLayout,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName,
            userProfileImage:user?.imageUrl,

        })

        console.log("finish");
        
        setLoading(false);
        router.replace('/create-course/'+id)
    }

  return (

    <div>

        {/* stepper */}

        <div className="flex flex-col justify-center items-center mt-10">
            <h2 className='text-2xl text-primary font-bold'>Create Course</h2>
            <div className="flex py-10">
                {StepperOption.map((item,index)=>(
                    <div className="flex items-center">
                        <div className="flex flex-col items-center w-[150px] md:w-[100px] ">
                        <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex>=index&&'bg-green-400'}`} >{item.icon}</div>
                        <h2 className={`hidden md:block md:text-sm`}>{item.name}</h2>
                    </div>
                   {index!=StepperOption?.length-1 &&<div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300
                    ${activeIndex>index &&  'bg-green-400'}`}></div>}
                    </div>

                ))}
            </div>
        </div>
        <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* components */}
                {activeIndex == 0?<SelectCategoryComponent />:activeIndex == 1?<TopicDesc />:<SelectOptions />}

        {/* Next Previous Button */}

        <div className="flex justify-between mt-10">
            <Button  variant='outline'  disabled={activeIndex==0} onClick={()=>setActiveIndex(activeIndex-1)}>Previous</Button>
            {activeIndex<2&&<Button disabled={CheckStatus()}  onClick={()=> setActiveIndex(activeIndex+1)}>next</Button>}
            {activeIndex==2 &&<Button disabled={CheckStatus()} onClick={()=> GenerateCourseLayout()}>Generate Course Layout</Button>}
        </div>
        </div>
        <LoadingDialog loading={Loading} />
    </div>
  )
}

export default CreateCourse