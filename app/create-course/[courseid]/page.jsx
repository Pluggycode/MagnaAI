'use client'
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/Schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { and,eq } from 'drizzle-orm';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetails from './_components/CourseDetails';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { getViewConfig, index } from 'drizzle-orm/mysql-core';
import { GenerateChapterContent_Ai } from '@/configs/AiModel';
import LoadingDialog from '../_components/LoadingDialog';
import Service from '@/configs/Service';
import { useRouter } from 'next/navigation';

const Course = ({ params }) => {

    const { user } = useUser();

    const [course,setCourse] = useState([]);
    
    const [loading,setLoading] = useState(false);

    const router = useRouter();
    
    useEffect(() => {
        params && getCourse();
    }, [params,user])

    const getCourse = async () => {
            const result2 = await db.select().from(CourseList).where(and(eq(CourseList.courseId,params?.courseid),eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress)));
            setCourse(result2[0]);
            console.log(result2);
    }

    const GenerateChapterContent = () => {
        setLoading(true);
        const chapters = course?.courseOutput?.chapters;
        chapters.forEach(async (chapter,index) => {
            const PROMPT = 'Explain the concept in detail on topic:'+course?.name+',chapter:'+chapter?.chapterName+'in JSON format with List of array with field as title, description in detail, Code Example(<precode> Code format) if applicable';
            console.log(PROMPT);
            // if(index<3)
            //     {
                    try
                    {
                        Service.getVideos(course?.name+':'+chapter?.chapterName).then(resp => {
                            console.log(resp);
                            videoId = resp[0]?.id?.videoId
                        })
                        let videoId = '';
                        const result = await GenerateChapterContent_Ai.sendMessage(PROMPT);
                        console.log(result?.response?.text());
                        const content = JSON.parse(result?.response?.text());

                        await db.insert(Chapters).values({
                            chapterId:index,
                            courseId:course?.courseId,
                            content:content,
                            videoId:videoId
                        })
                        setLoading(false);
                    }
                    catch(e)
                    {
                        setLoading(false);
                        console.log(e);
                    }
                    await db.update(CourseList).set({
                        publish:true
                    })
                    router.replace('/create-course/'+course?.courseId+'/finish')
        
                // }

        
        })

       
    }

    return (
        <div className='mt-2 px-7 md:px-20 lg:px-44'>
            <h2 className='font-bold text-center text-2xl '>Course Layout</h2>

            <LoadingDialog loading={loading}/>

            {/* basicInfo */}
            <CourseBasicInfo course={course} refreshData={() => getCourse()}/>

            {/* course Detail  */}
            
            <CourseDetails course={course} />

            {/* list of chapters  */}
            <ChapterList  course={course} refreshData={() => getCourse()}/>
            
            <Button className="my-10" onClick={GenerateChapterContent}>Generate Course Content</Button>
        </div>
    )
}

export default Course