import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Webcam from 'react-webcam'
const RecordAnswerSection = () => {
  return (
 <div className="flex flex-col items-center justify-center my-10 bg-gray-200 rounded-xl p-6 md:p-8 w-full max-w-md mx-auto shadow-lg">
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
          <Button
            className="mt-6 px-6 py-3"
          >
            Record Answer
          </Button>
        </div>
  )
}

export default RecordAnswerSection
