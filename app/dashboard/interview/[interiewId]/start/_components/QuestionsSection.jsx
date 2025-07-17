import { Lightbulb, Speaker, Volume, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQues,activeQuestionIndex}) => {

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
        const speech=new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(speech)
    }
    else{
        alert('Feature does on support this feature')
    }
  }

  return mockInterviewQues && (
    <div className='p-5 border rounded-lg my-5'>
     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'> 
    {mockInterviewQues && mockInterviewQues.slice(0, 5).map((questions, index) => (
      <h2 
        key={index} 
        className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index ? 'bg-[#6B21A8] text-white' : ''}`}
      >
        Questions #{index + 1}
      </h2>
    ))}
  </div>
      <h2 className='my-4 text-md md:text-lg'>{mockInterviewQues[activeQuestionIndex]?.question}</h2>
      <Volume2 onClick={()=>textToSpeech(mockInterviewQues[activeQuestionIndex]?.question)}></Volume2>
      <div className='border rounded-lg p-4 bg-blue-100 my-3'>
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
