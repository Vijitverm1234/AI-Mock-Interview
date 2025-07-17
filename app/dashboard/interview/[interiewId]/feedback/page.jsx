"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([])
  const [averageRating,setAverageRating]=useState(0)
  const router = useRouter()
  useEffect(() => {
    getFeedback()
  }, [])
  const getFeedback = async () => {
    const result = await db.select().
      from(UserAnswer).where(eq(UserAnswer.mockId, params.interiewId))
      .orderBy(UserAnswer.id)
    setFeedbackList(result)
    console.log(result)
    if (result.length > 0) {
      const totalRating = result.reduce((sum, item) => sum + Number(item.rating), 0);
       // Round to 1 decimal
      setAverageRating(totalRating/5);
    }
  }
  return (
    <>
      
       
      <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
        <h2 className='font-bold text-2xl'>Here is your Interview Feedback</h2>


    {feedbackList.length==0?
      <div className='border border-[#6b21a8] bg-purple-200 p-10 mt-5 mb-5 rounded-lg flex gap-3 '>
        <TriangleAlert></TriangleAlert>
        <h2 className='text-xl text-[#6B21A8]'>You have not given the Interview yet...</h2>
        </div>
       :
       <>
         <h2 className='text-lg text-primary'>Your Overall Interview Rating : <strong className='text-[#6B21A8]'>{averageRating*2}/10</strong></h2> {/* calculated total deedback */}
        <h2 className='text-sm text-gray-400'>Find below Interview Question with Correct Answers, Your Answers and Your Feedback</h2>
        {feedbackList && feedbackList.map((item, index) => (
          <Collapsible key={index} className='my-7'>
            <CollapsibleTrigger className=' flex justify-between gap-2 p-2 bg-secondary rounded-lg my-2  text-left'>
              {item.question} <ChevronsUpDownIcon className='h-4 w-5'></ChevronsUpDownIcon>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'>Rating: <strong>{item.rating}</strong></h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Answer : </strong> {item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer : </strong> {item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>FeedBack : </strong> {item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        </>
       }

      

        <Button className='bg-[#6B21A8] text-white hover:bg-[#926db0] items-center' onClick={() => router.replace('/dashboard')} >Go Home</Button >
    </div >
    
   </>
  )
}

export default Feedback
