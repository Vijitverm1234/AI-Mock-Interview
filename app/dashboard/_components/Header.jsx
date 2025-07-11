"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Header() {
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

  return (
    <div className=" w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-6 px-6 md:px-20 lg:px-32">
        <img src="/logo.svg" height={70} width={70}/>
        <ul className="hidden md:flex gap-7 text-gray-800">
          <a href="#home" className="cursor-pointer hover:text-gray-600 transition-colors">
            Home
          </a>
          <a href="#about" className="cursor-pointer hover:text-gray-600 transition-colors">
            About
          </a>
          <a href="#projects" className="cursor-pointer hover:text-gray-600 transition-colors">
            Projects
          </a>
          <a href="#testimonials" className="cursor-pointer hover:text-gray-600 transition-colors">
            Testimonials
          </a>
        </ul>

     <UserButton className="h-20 w-20" />
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
        className={`md:hidden ${show ? "fixed w-full" : "h-0 w-0"} right-0 top-0 bottom-0 overflow-hidden bg-white transition-all duration-300`}
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
            href="#about"
            onClick={() => setShow(false)}
            className="px-6 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={() => setShow(false)}
            className="px-6 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors"
          >
            Projects
          </a>
          <a
            href="#testimonials"
            onClick={() => setShow(false)}
            className="px-6 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors"
          >
            Testimonials
          </a>
        </ul>
      </div>
    </div>
  );
}