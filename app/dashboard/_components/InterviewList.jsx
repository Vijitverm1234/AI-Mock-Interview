"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard'

const InterviewList = () => {
    const { user } = useUser()
    const [interviewList, setInterviewList] = useState([])
    useEffect(() => {
        user && getInterviewList()
    }, [user])
    const getInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id))
        console.log(result)
        setInterviewList(result)
    }
    return (
        <div>
      <h2 className='font-medium text-xl '>Previous Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 my-3'>
      {interviewList && interviewList.map((interview,index)=>(
        <InterviewItemCard interview={interview} key={index}></InterviewItemCard>
      ))}
      </div>
    </div>
    )
}

export default InterviewList
