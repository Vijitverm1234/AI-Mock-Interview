"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import {
  AtomIcon,
  Calendar,
  MessagesSquare,
  Star,
  StarHalfIcon,
  StarIcon, Twitter, Linkedin, Github
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);
  const route = useRouter();
  return (
    <div>
      <div className=" w-full z-10">
        <div className="container mx-auto flex justify-between items-center py-6 px-6 md:px-20 lg:px-32">
          <img src="/logo.svg" height={70} width={70} />
          <ul className="hidden md:flex gap-7 text-gray-800">
            <a
              href="#home"
              className="cursor-pointer hover:text-gray-600 transition-colors"
            >
              Home
            </a>
            <a
             onClick={() => route.push("/dashboard")}
              className="cursor-pointer hover:text-gray-600 transition-colors"
            >
              <span className="text-[#6B21A8]">Schedule Interview</span>
            </a>
           <a
              href="#about"
              className="cursor-pointer hover:text-gray-600 transition-colors"
            >
              About us
            </a>
          </ul>

          <div className="flex items-center justify-center">
            <div className="scale-125 transform p-2">
              <UserButton />
            </div>
          </div>
          <button
            className="md:hidden text-gray-800 focus:outline-none hover:text-[#6B21A8] transition-colors"
            onClick={() => setShow(true)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* ---Mobile Menu----- */}
        <div
          className={`md:hidden ${
            show ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="flex justify-end p-6">
            <button
              className="text-gray-800 focus:outline-none hover:text-[#6B21A8] transition-colors"
              onClick={() => setShow(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-center gap-4 mt-8 px-6 text-lg font-medium text-gray-800">
            <a
              href="#home"
              onClick={() => setShow(false)}
              className="px-6 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors"
            >
              Home
            </a>
            <a
               onClick={() => route.push("/dashboard")}
              onClick={() => setShow(false)}
              className="px-6 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors"
            >
             <span className="text-[#6B21A8]">Schedule Interview</span>
            </a>
           
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 max-w-7xl mx-auto items-center justify-center">
        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            Ace Your <span className="text-[#6B21A8]">Interview </span> with
            AI-Powered Practice
          </h2>
          <p className="text-lg text-gray-600 italic flex gap-4">
            "Practice makes progress, not perfection." – Start preparing today!{" "}
            <AtomIcon className=""></AtomIcon>
          </p>
          <Button
            className="bg-[#6B21A8] text-white hover:bg-[#926db0] px-6 py-3 text-lg rounded-lg transition-transform transform hover:scale-105"
            onClick={() => route.push("/dashboard")}
          >
            Start Practicing Now
          </Button>
        </div>

        {/* Image Content */}
        <div className="flex justify-center">
          <img
            src="https://i.pinimg.com/736x/1a/da/62/1ada628a693c2e1f23f752030cd16a8e.jpg"
            alt="AI-driven mock interview illustration"
            height={400}
            width={400}
            className="border rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Your Path to Interview Success
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Follow these simple steps to ace your interview with AI-powered
          practice.
        </p>

        <ol className="relative space-y-8 md:space-y-10">
          {/* Timeline Item 1: Schedule Interview */}
          <li
            className="relative pl-8 md:pl-12 transition-all duration-300 hover:scale-105"
            aria-label="Step 1: Schedule Your Interview"
          >
            <span className="absolute left-0 top-2 block size-4 md:size-5 rounded-full bg-[#6B21A8] border-2 border-white dark:border-gray-800" />
            <div className="absolute left-2 top-2 h-full w-0.5 bg-[#6B21A8] dark:bg-gray-700 -z-10" />
            <div className="flex items-start gap-4">
              <Calendar
                className="h-6 w-6 text-[#6B21A8] mt-1"
                aria-hidden="true"
              />
              <div>
                <time className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  Step 1
                </time>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                  Choose a time and topic for your mock interview. Our AI
                  tailors questions to your needs.
                </p>
              </div>
            </div>
          </li>

          {/* Timeline Item 2: Give Interview */}
          <li
            className="relative pl-8 md:pl-12 transition-all duration-300 hover:scale-105"
            aria-label="Step 2: Give Your Interview"
          >
            <span className="absolute left-0 top-2 block size-4 md:size-5 rounded-full bg-[#6B21A8] border-2 border-white dark:border-gray-800" />
            <div className="absolute left-2 top-2 h-full w-0.5 bg-[#6B21A8] dark:bg-gray-700 -z-10" />
            <div className="flex items-start gap-4">
              <MessagesSquare
                className="h-6 w-6 text-[#6B21A8] mt-1"
                aria-hidden="true"
              />
              <div>
                <time className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  Step 2
                </time>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  Give Your Interview
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                  Practice with realistic AI-generated questions and simulate a
                  real interview experience.
                </p>
              </div>
            </div>
          </li>

          {/* Timeline Item 3: Review AI Feedback */}
          <li
            className="relative pl-8 md:pl-12 transition-all duration-300 hover:scale-105"
            aria-label="Step 3: Review AI Feedback"
          >
            <span className="absolute left-0 top-2 block size-4 md:size-5 rounded-full bg-[#6B21A8] border-2 border-white dark:border-gray-800" />
            <div className="flex items-start gap-4">
              <Star
                className="h-6 w-6 text-[#6B21A8] mt-1"
                aria-hidden="true"
              />
              <div>
                <time className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  Step 3
                </time>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  Review AI Feedback
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                  Get detailed, AI-driven feedback to improve your answers and
                  boost your confidence.
                </p>
              </div>
            </div>
          </li>
        </ol>

        <div className="mt-10 text-center">
          <Button
            className="bg-[#6B21A8] text-white hover:bg-[#926db0] px-6 py-3 text-lg rounded-lg transition-transform transform hover:scale-105"
            onClick={() => route.push("/dashboard")}
          >
            Start Your Journey
          </Button>
        </div>
      </div>

     <div className="h-[100vh] w-full bg-gradient-to-br from-[#6B21A8] to-[#D946EF] p-4 flex flex-col items-center justify-center relative overflow-hidden">
  <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-10 animate-pulse"></div>
  <div className="relative h-[90%] w-[90%] max-w-4xl">
    <img
      src="/tab.png"
      className="h-full w-full object-contain transition-transform duration-700 hover:scale-110 hover:rotate-1"
      alt="Virtual practice tablet"
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white/20 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-500 hover:bg-white/30">
      
      <p className="text-[#6B21A8] text-lg md:text-2xl font-medium mt-3 max-w-sm md:max-w-lg leading-relaxed">
        "Virtual practice turns dreams into skills, one click at a time."
      </p>
    </div>
  </div>
</div>

     <div className="p-6 md:p-10 flex flex-col items-center">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
    Motto, <span className="text-[#6B21A8]">Vision</span> and Aim
  </h2>
  <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 items-center p-6">
    <div className="bg-[#6B21A8] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-1.5">
        <StarIcon></StarIcon>Motto
      </h2>
      <p className="text-sm leading-relaxed">
        "Practice virtually, succeed globally: every click builds your future."
      </p>
    </div>
    <div className="bg-[#6B21A8] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-1.5">
        <StarIcon></StarIcon>Vision
      </h2>
      <p className="text-sm leading-relaxed">
        To revolutionize learning by creating immersive virtual practice environments accessible to all.
      </p>
    </div>
    <div className="bg-[#6B21A8] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-1.5">
        <StarIcon></StarIcon>Aim
      </h2>
      <p className="text-sm leading-relaxed">
        To empower individuals with innovative virtual tools that drive skill mastery and confidence.
      </p>
    </div>
  </div>
</div>
   <footer className="bg-gradient-to-r from-[#6B21A8] to-[#D946EF] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <p className="text-center text-sm md:text-base font-medium italic mb-6 max-w-2xl">
          "Virtual practicing: where dedication meets innovation, one step at a time."
        </p>
        <div className="flex space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-yellow-300 transition-colors duration-300"
            aria-label="Twitter"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-yellow-300 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-yellow-300 transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-6 text-xs md:text-sm text-white/70">
          &copy; {new Date().getFullYear()} Virtual Practice Hub. All rights reserved.
        </p>
      </div>
    </footer>
    
    </div>
  );
}
