import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, Save } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserAnswer } from '@/utils/schema';

const RecordAnswerSection = ({mockInterviewQues, activeQuestionIndex, interviewData}) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  const [userAns, setUserAns] = useState("");
  const {user} = useUser();

  useEffect(() => {
    results.map((result) => (
      setUserAns(prevAns => prevAns + result?.transcript)
    ));
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAns.length > 10) {
      UpdateUserAnswerInDb();
    }
  }, [userAns]);

  const SaveUserAnswer = async () => {
    if (!mockInterviewQues || !interviewData || activeQuestionIndex == null) {
      toast.error('Invalid interview data.');
      return;
    }
    if (isRecording) {
      stopSpeechToText();
      if (userAns.length < 10) {
        toast.error('Answer too short to save.');
        return;
      }
    } else {
      startSpeechToText();
    }
  };

  const StartStopRecording = async () => {
    await SaveUserAnswer();
  };

  const UpdateUserAnswerInDb = async () => {
    console.log(userAns);
    try {
      const feedbackPrompt = `Question: ${mockInterviewQues[activeQuestionIndex]?.question}, User Answer: ${userAns}, Provide rating and feedback for improvement in JSON format with rating and feedback fields.`;
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace('```json', '').replace('```', '');
      const jsonFeedback = JSON.parse(mockJsonResp);
      console.log(jsonFeedback);
      const resp = await db.insert(UserAnswer).values({
        mockId: interviewData?.mockId,
        question: mockInterviewQues[activeQuestionIndex].question,
        correctAns: mockInterviewQues[activeQuestionIndex]?.answer || '',
        userAns: userAns,
        feedback: jsonFeedback?.feedback,
        rating: jsonFeedback?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress || '',
        createdAt: moment().toISOString(),
      });
      if (resp) {
        toast.success('Answer recorded successfully.');
        setUserAns('')
        setResults([])
      }
      setUserAns('');
      setResults([])
    } catch (error) {
      toast.error('Failed to save answer.');
      console.error(error);
    }
  };

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
          className="px-6  border border-[#6B21A8] bg-white text-[#6B21A8] hover:bg-[#926db0] hover:text-white"
          onClick={StartStopRecording} // Corrected to use StartStopRecording
        >
          {isRecording ?
            <h2 className='text-red-300 flex items-center gap-1'>
              <Mic /> Recording...
            </h2>
            :
           <><Save></Save> 'Record Answer'</> 
          }
        </Button>
        {/* <Button onClick={() => console.log(userAns)}>Show user Answer</Button> */}
      </div>
    </div>
  );
};

export default RecordAnswerSection;