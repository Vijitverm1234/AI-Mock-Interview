"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import {
  AtomIcon,
  Calendar,
  MessagesSquare,
  Star,
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
    <div className="font-sans antialiased bg-gray-50">
      {/* Navbar */}
      <div className="w-full z-20 bg-white/80 backdrop-blur-md sticky top-0 shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
          <img src="/logo.svg" height={60} width={60} alt="Logo" className="h-12 w-12 md:h-16 md:w-16"/>
          <ul className="hidden md:flex gap-8 text-gray-800 font-medium">
            <a href="#home" className="hover:text-purple-600 transition-colors">Home</a>
            <a
              onClick={() => route.push("/dashboard")}
              className="cursor-pointer hover:text-purple-600 transition-colors"
            >
              <span className="text-purple-600 font-semibold">Schedule Interview</span>
            </a>
            <a href="#about" className="hover:text-purple-600 transition-colors">About us</a>
          </ul>

          <div className="flex items-center gap-4">
            <div className="scale-110">
              <UserButton />
            </div>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-800 hover:text-purple-600 transition-colors"
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
        {show && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-30 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              className="absolute top-6 right-6 text-gray-800 hover:text-purple-600 transition-colors text-3xl"
              onClick={() => setShow(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <a href="#home" onClick={() => setShow(false)} className="text-xl font-medium hover:text-purple-600 transition">
              Home
            </a>
            <a
              onClick={() => {
                route.push("/dashboard");
                setShow(false);
              }}
              className="text-xl font-semibold text-purple-600"
            >
              Schedule Interview
            </a>
            <a href="#about" onClick={() => setShow(false)} className="text-xl font-medium hover:text-purple-600 transition">
              About Us
            </a>
          </motion.div>
        )}
      </div>

      {/* Hero Section */}
      <div id="home" className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-6 md:px-20 max-w-7xl mx-auto items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start space-y-6 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-snug">
            Ace Your <span className="text-purple-600">Interview</span> with <br />
            AI-Powered Practice
          </h2>
          <p className="text-lg text-gray-600 italic flex gap-2 items-center">
            "Practice makes progress, not perfection."
            <AtomIcon className="text-purple-600" />
          </p>
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg rounded-xl shadow-lg transition-transform hover:scale-105"
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
            className="rounded-3xl shadow-2xl border-4 border-white/50 hover:scale-105 transition-transform w-full max-w-md md:max-w-lg"
          />
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="p-6 md:p-10 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          Your Path to Interview Success
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10">
          Follow these simple steps to ace your interview with AI-powered practice.
        </p>

        <ol className="relative space-y-10">
          {[
            { icon: Calendar, title: "Step 1: Schedule Interview", desc: "Choose a time and topic. Our AI tailors questions to your needs." },
            { icon: MessagesSquare, title: "Step 2: Give Your Interview", desc: "Practice with realistic AI-generated questions and simulate a real interview." },
            { icon: Star, title: "Step 3: Review AI Feedback", desc: "Get detailed, AI-driven feedback to improve your answers and boost confidence." },
          ].map((step, i) => (
            <li key={i} className="relative pl-10 md:pl-16">
              <span className="absolute left-0 top-3 w-4 h-4 rounded-full bg-purple-600" />
              <div className="flex items-start gap-4">
                <step.icon className="h-6 w-6 text-purple-600 mt-1"/>
                <div>
                  <h3 className="font-bold text-lg md:text-xl">{step.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{step.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 py-16 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { number: "10K+", label: "Mock Interviews Conducted" },
            { number: "85%", label: "Improved Success Rate" },
            { number: "120+", label: "Companies Covered" },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-xl hover:bg-white/20 transition">
              <h3 className="text-4xl font-extrabold">{stat.number}</h3>
              <p className="mt-2 text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          What Our Users Say 💬
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Luke DeVail", role: "Software Engineer @ Google", text: "This platform boosted my confidence! I cracked 3 interviews in a month.", img: "/pfp1.jpg" },
            { name: "Kate Vincet", role: "Data Analyst @ Microsoft", text: "The AI feedback was so detailed, it felt like a real mentor guiding me.", img: "/pfp3.jpg" },
            { name: "Angel Van", role: "Fresher, CS Graduate", text: "Mock practice here made my campus placements stress-free!", img: "/pfp2.jpg" },
          ].map((user, i) => (
            <div key={i} className="bg-white shadow-xl p-6 rounded-3xl hover:scale-105 transition-transform text-center">
              <img src={user.img} alt={user.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-purple-600"/>
              <p className="text-gray-700 italic">"{user.text}"</p>
              <h3 className="mt-3 font-semibold text-gray-900">{user.name}</h3>
              <span className="text-sm text-gray-500">{user.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
          Frequently Asked Questions ❓
        </h2>
        <div className="space-y-6">
          {[
            { q: "Is this platform free to use?", a: "Yes! You can practice mock interviews for free. Premium plans unlock advanced analytics." },
            { q: "Do I need prior experience?", a: "Not at all. Whether you are a fresher or a pro, our AI tailors the interview to your level." },
            { q: "How accurate is the AI feedback?", a: "Our AI is trained on real-world interview data to provide actionable feedback on answers, tone, and confidence." },
          ].map((faq, i) => (
            <details key={i} className="bg-purple-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
              <summary className="font-semibold text-purple-700 cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-gray-700">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 text-white py-16 px-6 md:px-20 text-center mt-12 rounded-xl shadow-xl max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Boost Your Interview Confidence? 🚀</h2>
        <p className="text-white/80 mb-6">Join thousands of learners practicing smarter with AI-driven feedback.</p>
        <Button
          className="bg-white text-purple-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
          onClick={() => route.push("/dashboard")}
        >
          Start Practicing Free
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-10 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-4">
          <p className="text-sm md:text-base italic">"Virtual practicing: where dedication meets innovation, one step at a time."</p>
          <div className="flex gap-6 mt-2">
            {[{icon: Twitter, href: "https://twitter.com"}, {icon: Linkedin, href: "https://linkedin.com"}, {icon: Github, href: "https://github.com"}].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-yellow-300 transition-colors">
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs md:text-sm text-white/70">© {new Date().getFullYear()} Virtual Practice Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
