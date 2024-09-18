'use client'
import React, { useEffect, useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
  import { db } from '@/configs/db';
  import { eq } from 'drizzle-orm';
  import { CourseList } from '@/configs/Schema';

const EditChapters = ({course,index,refreshData}) => {

    const Chapters=course?.courseOutput?.chapters;
    const [name,setName] = useState();
    const [about,setAbout] = useState();

    useEffect (() => {
        setName(Chapters[index].chapterName);
        setAbout(Chapters[index].about);
    },[course])
    const onUpadateHandler = async() => {
        course.courseOutput.chapters[index].chapterName = name;
        course.courseOutput.chapters[index].about = about;
        const result = await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id,course?.id)).returning({id:CourseList?.id})

        refreshData(true);

    }

  return (
    <Dialog>
  <DialogTrigger><BiSolidEdit/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Chapter</DialogTitle>
      <DialogDescription>
      <div className="mt-3">
            <label htmlFor=""> Course Title </label>
            <Input defaultValue={Chapters[index].chapterName} onChange={(event) => setName(event.target.value)}/>
        </div>
        <div className=""> 
            <label htmlFor=""> Description </label>
            <Textarea defaultValue={Chapters[index].about} onChange={(event) => setAbout(event.target.value)}className="h-40"/>
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

export default EditChapters