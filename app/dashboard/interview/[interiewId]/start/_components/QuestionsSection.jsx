import { Lightbulb } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQues,activeQuestionIndex}) => {
  return mockInterviewQues && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'> 
        {mockInterviewQues && mockInterviewQues.map((questions,index)=>(
            <h2 className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index && 'bg-[#6B21A8] text-white'}`}>Questions #{index+1}</h2>
        ))}
        
      </div>
      <h2 className='my-5 text-md md:text-lg'>{mockInterviewQues[activeQuestionIndex]?.question}</h2>
      <div className='border rounded-lg p-5 bg-blue-100 my-10'>
        <h2 className='flex gap-3 items-center text-primary'>
            <Lightbulb></Lightbulb>
            <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-5'>Enable Video Web Cam and Microphone to start your AI Generated Mock Interview, It has 5 questions which you can answer. we never record your video.</h2>
      </div>
    </div>
  )
}

export default QuestionsSection
