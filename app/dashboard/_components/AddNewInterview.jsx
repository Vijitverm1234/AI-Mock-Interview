'use client'; // If using Next.js App Router with client-side features
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { chatSession } from '@/utils/GeminiAIModal.js';
import { Loader2, LoaderCircle } from 'lucide-react';

const AddNewInterview = () => {
  const [jobp, setJobp] = useState('');
  const [jobd, setJobd] = useState('');
  const [jobe, setJobe] = useState('');
  const [openDia, setOpenDia] = useState(false);
  const [loading,setLoading]=useState(false)
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(jobd, jobe, jobp);

    const InputPrompt = `
      The questions should assess skills in ${jobd} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
    `;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','')
      console.log(JSON.parse(mockJsonResp)); // Log response for debugging
      // Handle the result as needed (e.g., store questions, navigate to another page)

       setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
       setLoading(false);
    }
   
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDia(true)}
      >
        <h2 className="font-bold text-lg text-center cursor-pointer">+ Add new</h2>
      </div>
      <Dialog open={openDia}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add Details About your job position/role, job description and year of experience</h2>
                  <div className="mt-5 my-2">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Example: Full Stack Developer"
                      required
                      onChange={(e) => setJobp(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 my-2">
                    <label>Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="Example: node.js, express.js etc"
                      onChange={(e) => setJobd(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 my-2">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Example: 3 years"
                      type="number"
                      max="40"
                      onChange={(e) => setJobe(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button variant="ghost" onClick={() => setOpenDia(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}> 
                    {loading? <><LoaderCircle className='animate-spin'/>'Generating From AI'</>:'Start Interview'}
                   </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;