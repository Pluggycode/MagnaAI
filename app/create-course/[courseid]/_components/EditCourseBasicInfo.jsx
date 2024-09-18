'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { BiSolidEdit } from "react-icons/bi";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/Schema';
import { eq } from 'drizzle-orm';
  

const EditCourseBasicInfo = ({course,refreshData}) => {

    const [name,setName] = useState();
    const [desc,setDesc] = useState();

    useEffect(() => {
        setName(course?.courseOutput?.courseName);
        setDesc(course?.courseOutput?.description);
    },[course])

    const onUpadateHandler = async () => {
        course.courseOutput.courseName = name;
        course.courseOutput.description = desc;

        const result = await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id,course?.id))
        
        .returning({id:CourseList.id})
        console.log(result)
        console.log(course);
        refreshData(true);
    } 


  return (
    <Dialog>
  <DialogTrigger><BiSolidEdit/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className="mt-3">
            <label htmlFor=""> Course Title </label>
            <Input defaultValue={course?.courseOutput?.courseName} onChange={(event) => setName(event.target.value)}/>
        </div>
        <div className=""> 
            <label htmlFor=""> Description </label>
            <Textarea defaultValue={course?.courseOutput?.description} onChange={(event) => setDesc(event.target.value)}className="h-40"/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button onClick={onUpadateHandler}> Update</Button>
        </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default EditCourseBasicInfo