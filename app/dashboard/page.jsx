import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

const DashBoardLayout = () => {
  return (
    <div className='p-10 ' >
    <h2 className='font-bold text-2xl '>DashBoard</h2>
    <h2 className='text-gray-500'>Create and Start your own AI Mock Interview</h2>
    <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview></AddNewInterview>
    </div>
    {/* Previous Interviews List  */}
    <InterviewList></InterviewList>
    </div>
  )
}

export default DashBoardLayout
