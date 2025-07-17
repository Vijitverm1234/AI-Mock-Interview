import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      {/* Left Section for Image (Fixed) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center bg-gray-200 overflow-hidden fixed top-0 left-0 z-10">
        <img
          src="https://i.pinimg.com/736x/c4/e4/f6/c4e4f6278baf62842fd6f4b02cf12f65.jpg"
          alt="Sign Up Visual"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Section for Form (Scrollable) */}
      <div className="w-full md:w-1/2 ml-0 md:ml-[50%] flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded',
                card: 'bg-transparent shadow-none',
                socialButtonsBlockButton:
                  'border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded',
                formFieldInput:
                  'border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded',
              },
            }}
          />
        </div>
      </div>
     
    </div>
  );
}