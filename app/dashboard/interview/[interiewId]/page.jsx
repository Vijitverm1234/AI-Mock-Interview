'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { WebcamIcon, AlertCircle, Lightbulb } from 'lucide-react';
import Webcam from 'react-webcam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Let's Get Started</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interview Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    <strong>Job Role:</strong> {interviewData?.jobPosition || 'N/A'}
                  </h3>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    <strong>Job Description/Tech Stack:</strong>{' '}
                    {interviewData?.jobDesc || 'N/A'}
                  </h3>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    <strong>Years of Experience:</strong>{' '}
                    {interviewData?.jobExperience || 'N/A'}
                  </h3>
                </div>
                <div className='p-5 border rounded-lg border-yellow-200 bg-yellow-100'>
                  <h2 className='flex gap-2 items-center text-yellow-600'><><Lightbulb /> <strong>Information</strong></></h2>
                  <h2 className='mt-3 text-yellow-500 '>Enable Video Web Cam and Microphone to start your AI Generated Mock Interview, It has 5 questions which you can answer. Note: we never record your video.</h2>
                </div>
              </CardContent>
            </Card>

            {/* Webcam Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Webcam
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {webcamEnabled ? (
                  <Webcam
                    audio={true}
                    height={300}
                    width={300}
                    mirrored={true}
                    onUserMedia={() => setWebcamEnabled(true)}
                    onUserMediaError={() => {
                      setWebcamEnabled(false);
                      setError('Failed to access webcam or microphone. Please check permissions.');
                    }}
                    className="rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <WebcamIcon className="h-40 w-40 text-gray-400 bg-gray-100 rounded-lg p-8 mb-4" />
                    <Button
                      onClick={() => setWebcamEnabled(true)}
                      className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      aria-label="Enable webcam and microphone"
                    >
                      Enable Webcam and Microphone
                    </Button>

                    <Link href={'/dashboard/interview/' + params.interiewId + '/start'}>
                      <Button
                        className="mt-5 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Start with Your Interview Session
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;