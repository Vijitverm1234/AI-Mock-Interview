import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
const RecordAnswerSection = () => {
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
            onClick={isRecording?stopSpeechToText:startSpeechToText}
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
