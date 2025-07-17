"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const InterviewItemCard = ({ interview }) => {
    const router=useRouter();
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeed=()=>{
      router.push('dashboard/interview/'+interview?.mockId+'/feedback')
    }
  return (
    <div className='border shadow-sm border-[#6B21A8] rounded-lg p-3'>
      <h2 className='font-bold text-[#6B21A8]'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-500'>Experience: {interview?.jobExperience}</h2>
      <h2 className='text-sm text-gray-500'>
        Created At: {interview?.createdAt 
          ? (interview.createdAt instanceof Date 
              ? interview.createdAt.toLocaleDateString() 
              : interview.createdAt) 
          : 'N/A'}
      </h2>
      <div className='flex gap-3 my-3'>

        <Button className="bg-[#6B21A8] text-white hover:text-white hover:bg-[#594070]" onClick={onStart} >Start</Button>
        <Button className="bg-[#6B21A8] text-white hover:text-white hover:bg-[#594070]" onClick={onFeed}>Feedback</Button>
 

      </div>
    </div>
  )
}

export default InterviewItemCard