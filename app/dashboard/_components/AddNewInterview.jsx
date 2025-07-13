'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { chatSession } from '@/utils/GeminiAIModal';

const AddNewInterview = () => {
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jsonResponse,setJsonResponse]=useState(null)
  const { user } = useUser();
  const router = useRouter();

 const onSubmit = async (e) => {
  e.preventDefault();

  // Validate input fields
  if (!jobPosition || !jobDescription || !jobExperience) {
    alert('Please fill in all fields.');
    return;
  }

  if (!user?.primaryEmailAddress?.emailAddress) {
    alert('User email not found. Please ensure you are logged in.');
    return;
  }

  setLoading(true);

  const InputPrompt = `
    The questions should assess skills in ${jobDescription} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
  `;

  try {
    const result = await chatSession.sendMessage(InputPrompt);
    const rawResponse = result.response.text();
    console.log('Raw Response:', rawResponse); // Debug raw response

    // Robustly clean response to remove Markdown or extra whitespace
    const mockJsonResp = rawResponse.replace(/```json\s*|\s*```/g, '').trim();
    console.log('Cleaned Response:', mockJsonResp); // Debug cleaned response

    let parsedResponse;
    try {
      // Validate if response is likely JSON before parsing
      if (!mockJsonResp.startsWith('[') || !mockJsonResp.endsWith(']')) {
        throw new Error('Response is not a valid JSON array');
      }
      parsedResponse = JSON.parse(mockJsonResp);
      console.log('Parsed Response:', parsedResponse);
      setJsonResponse(parsedResponse); // Store parsed JSON
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      console.error('Problematic JSON string:', mockJsonResp);
      throw new Error('Invalid JSON response from API');
    }

    if (parsedResponse && user?.primaryEmailAddress?.emailAddress) {
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: mockJsonResp,
        jobDesc: jobDescription,
        jobExperience: jobExperience,
        jobPosition: jobPosition,
        createdBy: user.primaryEmailAddress.emailAddress,
        createdAt: new Date(),
      }).returning({ mockId: MockInterview.mockId });

      console.log('Inserted ID:', resp);
      if (resp.length > 0) {
        setOpenDialog(false); // Close dialog
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      }
    } else {
      console.log('No valid response or user email missing');
      alert('Failed to generate interview: No valid response or user email missing.');
    }
  } catch (error) {
    console.error('Error generating interview:', error);
    alert(`An error occurred: ${error.message}. Please try again.`);
  } finally {
    setLoading(false);
  }
};
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center cursor-pointer">+ Add new</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
            <p className="text-gray-600">
              Add details about your job position/role, job description, and years of experience.
            </p>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Role/Job Position</label>
              <Input
                placeholder="Example: Full Stack Developer"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Description/Tech Stack</label>
              <Textarea
                placeholder="Example: node.js, express.js etc"
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
              <Input
                placeholder="Example: 3 years"
                type="number"
                max="40"
                min="0"
                required
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>
            <div className="flex gap-5 justify-end">
              <Button variant="ghost" onClick={() => setOpenDialog(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" />
                    Generating From AI
                  </>
                ) : (
                  'Start Interview'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;