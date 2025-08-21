"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import {
  AtomIcon,
  Calendar,
  MessagesSquare,
  Star,
  StarIcon,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [show, setShow] = useState(false);
  const route = useRouter();

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return (
    <div className="font-sans antialiased">
      {/* Navbar */}
      <div className="w-full z-20 bg-white/70 backdrop-blur-md sticky top-0 shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
          <img src="/logo.svg" height={60} width={60} alt="Logo" />
          <ul className="hidden md:flex gap-7 text-gray-800 font-medium">
            <a href="#home" className="hover:text-[#6B21A8] transition-colors">
              Home
            </a>
            <a
              onClick={() => route.push("/dashboard")}
              className="cursor-pointer hover:text-[#6B21A8] transition-colors"
            >
              <span className="text-[#6B21A8] font-semibold">
                Schedule Interview
              </span>
            </a>
            <a
              href="#about"
              className="hover:text-[#6B21A8] transition-colors"
            >
              About us
            </a>
          </ul>

          <div className="flex items-center gap-4">
            <div className="scale-110">
              <UserButton />
            </div>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-800 hover:text-[#6B21A8] transition-colors"
              onClick={() => setShow(true)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: show ? "0%" : "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-white z-30 flex flex-col items-center justify-center gap-6"
        >
          <button
            className="absolute top-6 right-6 text-gray-800 hover:text-[#6B21A8] transition-colors"
            onClick={() => setShow(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <a href="#home" onClick={() => setShow(false)} className="text-lg font-medium hover:text-[#6B21A8]">
            Home
          </a>
          <a
            onClick={() => {
              route.push("/dashboard");
              setShow(false);
            }}
            className="text-lg font-semibold text-[#6B21A8]"
          >
            Schedule Interview
          </a>
          <a href="#about" onClick={() => setShow(false)} className="text-lg font-medium hover:text-[#6B21A8]">
            About Us
          </a>
        </motion.div>
      </div>

      {/* Hero Section */}
      <div id="home" className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 max-w-7xl mx-auto items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start space-y-6 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-snug">
            Ace Your <span className="text-[#6B21A8]">Interview</span> with <br />
            AI-Powered Practice
          </h2>
          <p className="text-lg text-gray-600 italic flex gap-3">
            "Practice makes progress, not perfection."
            <AtomIcon className="text-[#6B21A8]" />
          </p>
          <Button
            className="bg-[#6B21A8] text-white hover:bg-[#926db0] px-8 py-4 text-lg rounded-xl shadow-lg transition-transform hover:scale-105"
            onClick={() => route.push("/dashboard")}
          >
            🚀 Start Practicing Now
          </Button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://i.pinimg.com/736x/1a/da/62/1ada628a693c2e1f23f752030cd16a8e.jpg"
            alt="AI Mock Interview"
            className="rounded-3xl shadow-2xl border-4 border-white/50 hover:scale-105 transition-transform"
            height={400}
            width={400}
          />
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Your Path to Interview Success
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Follow these simple steps to ace your interview with AI-powered practice.
        </p>

        <ol className="relative space-y-8 md:space-y-10">
          {/* Step 1 */}
          <li className="relative pl-8 md:pl-12">
            <span className="absolute left-0 top-2 block size-5 rounded-full bg-[#6B21A8]" />
            <div className="flex items-start gap-4">
              <Calendar className="h-6 w-6 text-[#6B21A8] mt-1"/>
              <div>
                <h3 className="font-bold">Step 1: Schedule Interview</h3>
                <p className="text-gray-600 text-sm">
                  Choose a time and topic. Our AI tailors questions to your needs.
                </p>
              </div>
            </div>
          </li>
          {/* Step 2 */}
          <li className="relative pl-8 md:pl-12">
            <span className="absolute left-0 top-2 block size-5 rounded-full bg-[#6B21A8]" />
            <div className="flex items-start gap-4">
              <MessagesSquare className="h-6 w-6 text-[#6B21A8] mt-1"/>
              <div>
                <h3 className="font-bold">Step 2: Give Your Interview</h3>
                <p className="text-gray-600 text-sm">
                  Practice with realistic AI-generated questions and simulate a real interview.
                </p>
              </div>
            </div>
          </li>
          {/* Step 3 */}
          <li className="relative pl-8 md:pl-12">
            <span className="absolute left-0 top-2 block size-5 rounded-full bg-[#6B21A8]" />
            <div className="flex items-start gap-4">
              <Star className="h-6 w-6 text-[#6B21A8] mt-1"/>
              <div>
                <h3 className="font-bold">Step 3: Review AI Feedback</h3>
                <p className="text-gray-600 text-sm">
                  Get detailed, AI-driven feedback to improve your answers and boost confidence.
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-[#6B21A8] to-[#D946EF] py-16 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { number: "10K+", label: "Mock Interviews Conducted" },
            { number: "85%", label: "Improved Success Rate" },
            { number: "120+", label: "Companies Covered" },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-lg hover:bg-white/10 transition">
              <h3 className="text-4xl font-extrabold">{stat.number}</h3>
              <p className="mt-2 text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
          What Our Users Say 💬
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Luke DeVail",
              role: "Software Engineer @ Google",
              text: "This platform boosted my confidence! I cracked 3 interviews in a month.",
              img: "/pfp1.jpg",
            },
            {
              name: "Kate Vincet",
              role: "Data Analyst @ Microsoft",
              text: "The AI feedback was so detailed, it felt like a real mentor guiding me.",
              img: "/pfp3.jpg",
            },
            {
              name: "Angel Van",
              role: "Fresher, CS Graduate",
              text: "Mock practice here made my campus placements stress-free!",
              img: "/pfp2.jpg",
            },
          ].map((user, i) => (
            <div
              key={i}
              className="bg-white shadow-xl p-6 rounded-2xl hover:scale-105 transition-transform text-center"
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#6B21A8]"
              />
              <p className="text-gray-700 italic">"{user.text}"</p>
              <h3 className="mt-3 font-semibold text-gray-900">{user.name}</h3>
              <span className="text-sm text-gray-500">{user.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions ❓
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Is this platform free to use?",
              a: "Yes! You can practice mock interviews for free. Premium plans unlock advanced analytics.",
            },
            {
              q: "Do I need prior experience?",
              a: "Not at all. Whether you are a fresher or a pro, our AI tailors the interview to your level.",
            },
            {
              q: "How accurate is the AI feedback?",
              a: "Our AI is trained on real-world interview data to provide actionable feedback on answers, tone, and confidence.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="bg-gray-100 p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <summary className="font-semibold text-gray-800 cursor-pointer">
                {faq.q}
              </summary>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#6B21A8] text-white py-10 px-6 md:px-16 text-center mt-12 rounded-xl shadow-xl max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Boost Your Interview Confidence? 🚀
        </h2>
        <p className="text-white/80 mb-6">
          Join thousands of learners practicing smarter with AI-driven feedback.
        </p>
        <Button
          className="bg-white text-[#6B21A8] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
          onClick={() => route.push("/dashboard")}
        >
          Start Practicing Free
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#6B21A8] to-[#D946EF] text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <p className="text-sm md:text-base italic mb-6">
            "Virtual practicing: where dedication meets innovation, one step at a time."
          </p>
          <div className="flex gap-6">
            {[{icon: Twitter, href: "https://twitter.com"}, {icon: Linkedin, href: "https://linkedin.com"}, {icon: Github, href: "https://github.com"}].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-yellow-300 transition-colors"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs md:text-sm text-white/70">
            © {new Date().getFullYear()} Virtual Practice Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
