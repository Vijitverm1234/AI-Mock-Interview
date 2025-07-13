"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

const StartInterview = ({params}) => {
    const [interviewData, setInterviewData] = useState(null);
     const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [mockInterviewQues,setMockInterviewQues]=useState()
      const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
  useEffect(() => {
     console.log('Params:', params);
     getInterviewDetails();
   }, []);
 
   const getInterviewDetails = async () => {
     try {
       setLoading(true);
       const result = await db
         .select()
         .from(MockInterview)
         .where(eq(MockInterview.mockId, params.interiewId));
       console.log('Database Query Result:', result);
       if (result.length > 0) {
         setInterviewData(result[0]);
        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp)
       setMockInterviewQues(jsonMockResp)
       } else {
         setError('No interview found with the provided ID.');
       }
      
     } catch (err) {
       console.error('Error fetching interview details:', err);
       setError('Failed to load interview details. Please try again.');
     } finally {
       setLoading(false);
     }
   };
    return (
    
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
        <QuestionsSection mockInterviewQues={mockInterviewQues} activeQuestionIndex={activeQuestionIndex}></QuestionsSection>
        <RecordAnswerSection></RecordAnswerSection>
      </div>
    </div>
  )
}

export default StartInterview
