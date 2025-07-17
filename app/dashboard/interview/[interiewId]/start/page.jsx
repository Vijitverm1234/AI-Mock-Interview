"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft, ArrowBigRight, StopCircle } from 'lucide-react';
import Link from 'next/link';

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
        <RecordAnswerSection  mockInterviewQues={mockInterviewQues}  activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}></RecordAnswerSection>
      </div>
      <div className='flex justify-center gap-3 mb-3'> 
       { activeQuestionIndex>0 && <Button className="bg-[#6B21A8] text-white hover:bg-[#926db0] items-center"  onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}> <ArrowBigLeft></ArrowBigLeft> Previous</Button>}
       { activeQuestionIndex!=4 && <Button className="bg-[#6B21A8] text-white hover:bg-[#926db0] items-center" onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}> Next<ArrowBigRight></ArrowBigRight></Button>}
       { activeQuestionIndex==4 && 
       <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
       <Button className="bg-[#6B21A8] text-white hover:bg-[#926db0] items-center">
        <StopCircle></StopCircle>End Interview
        </Button></Link>}
        
      </div>
    </div>
  )
}

export default StartInterview
