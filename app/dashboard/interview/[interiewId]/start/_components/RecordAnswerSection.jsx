import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
const RecordAnswerSection = ({mockInterviewQues, activeQuestionIndex}) => {
      const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  const [userAns,setUserAns]=useState("");
  useEffect(()=>{
     results.map((result)=>(
        setUserAns(preAns=>preAns+result?.transcript)
     ))
  },[results])

const SaveUserAnswer= async()=>{
   if(isRecording){
    stopSpeechToText();
    if(userAns.length <10){
      toast('error while saving your answer.')
    }
    const feedbackPrompt="Question"+mockInterviewQues[activeQuestionIndex]?.question+
    ",User Answer"+userAns+",depends on and question and useranswer for given interview question please give us rating for answer and feedback for area of improvement if any in 3 to 5 line for imporment , in json format with rating feild and feedback feild"
    const result=await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp=(result.response.text()).replace('```json','').replace(  `'''`,'')
    console.log(mockJsonResp)
    const jsonFeedback=JSON.parse(mockJsonResp)
    
   }
   else{
    startSpeechToText()
   }

}

  return (
 <div className="flex flex-col items-center justify-center my-10 bg-gray-300 rounded-xl p-6 md:p-8 w-full max-w-md mx-auto shadow-lg">
          <div className="relative w-full h-64 md:h-80">
            <img
              src="/webcam.png"
              alt="Webcam Overlay"
              className="absolute inset-0 w-full h-full object-contain z-0 opacity-30"
            />
            <Webcam
              mirrored={true}
              className="w-full h-full object-cover rounded-lg z-10"
            />
          </div>
          <div className='flex items-center gap-3'>
          <Button
            className=" px-6 "
            onClick={SaveUserAnswer}
          >
            {isRecording?
            <h2 className='text-red-300 flex items-center gap-1'>
            <Mic/>Recoding...</h2>
            :
            'Record Answer'
            }
          </Button>
          <Button onClick={()=>console.log(userAns)}>Show user Answer</Button></div>
        </div>
  )
}

export default RecordAnswerSection
