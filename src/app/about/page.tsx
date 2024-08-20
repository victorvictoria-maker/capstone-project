"use client";

import Navbar from "@/components/hospitals/landingpage/navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen  text-gray-800 p-6'>
        {/* Hero Section */}
        <section className='text-center py-16'>
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='text-5xl font-extrabold mb-4'
          >
            Care Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className='text-2xl font-medium mb-8'
          >
            Finding the right care for you.
          </motion.p>
          <Image
            src='/images/african-american-doctor-doing-checkup-visit-with-female-wheelchair-user-talking-about-physical-disability-healthcare-diagnosis-consulting-woman-with-impairment-medical-appointment.jpg'
            alt='Care Connect Hero'
            className='w-full max-w-3xl mx-auto rounded-lg shadow-lg'
            width={1200}
            height={600}
          />
        </section>

        {/* Project Details */}
        <section className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 my-16 px-4'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='bg-white p-8 rounded-lg shadow-lg'
          >
            <h2 className='text-3xl font-bold text-[#456DFF] mb-4'>
              Project Overview
            </h2>
            <p className='text-lg'>
              Care Connect is a platform designed to help users locate hospitals
              nearby. It includes features such as searching, filtering, and
              sharing results, along with an admin panel for managing hospital
              records. This capstone project for Alt School leverages modern web
              technologies to deliver a seamless user experience.
            </p>
            <div className='mt-2'>
              <p className='text-[#456DFF]  font-bold'>Admin access</p>
              <p>Email:- viktohrier01@gmail.com</p>
              <p>Password:- Vicky02#</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='bg-white p-8 rounded-lg shadow-lg'
          >
            <h2 className='text-3xl font-bold text-[#456DFF] mb-4'>Features</h2>
            <ul className='list-disc ml-5 space-y-2 text-lg'>
              <li className='flex items-center gap-2'>
                <FaCheck className='text-[#04A5BA]/80' /> Hospital search by
                location and type
              </li>
              <li className='flex items-center gap-2'>
                <FaCheck className='text-[#04A5BA]/80' /> Filtering by state and
                hospital type
              </li>
              <li className='flex items-center gap-2'>
                <FaCheck className='text-[#04A5BA]/80' /> Copy and export
                filtered results
              </li>
              <li className='flex items-center gap-2'>
                <FaCheck className='text-[#04A5BA]/80' /> Admin panel for
                managing hospitals
              </li>
              <li className='flex items-center gap-2'>
                <FaCheck className='text-[#04A5BA]/80' /> Email/password and
                OAuth authentication (Google, GitHub)
              </li>
              <li className='flex items-center gap-2'>
                <FaCheck className='text-[#04A5BA]/80' /> Responsive design for
                all devices
              </li>
              <li className='flex items-center gap-2'>
                <FaCheck className='text-[#04A5BA]/80' /> SEO optimized for
                better search visibility
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Technology Stack */}
        <section className='bg-[#04A5BA] py-16 text-white'>
          <div className='max-w-6xl mx-auto text-center'>
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='text-4xl font-bold mb-8'
            >
              Technology Stack
            </motion.h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className='bg-white text-gray-800 p-6 rounded-lg shadow-lg'
                >
                  <h3 className='text-2xl font-semibold mb-2 text-[#456DFF]'>
                    {tech.name}
                  </h3>
                  <p>{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='text-center py-16'>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href='https://capstone-project-rouge.vercel.app/hospitals'
            className='inline-block px-10 py-4 rounded-full text-white bg-[#456DFF] font-semibold shadow-lg'
          >
            See hospitals
          </motion.a>
        </section>
      </div>
    </>
  );
}

const technologies = [
  {
    name: "Next.js 14",
    description:
      "The React framework for production, optimized for speed and performance.",
  },
  {
    name: "TypeScript",
    description:
      "Typed JavaScript at scale, ensuring safer and more predictable code.",
  },
  {
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development.",
  },
  {
    name: "Prisma",
    description: "A modern database toolkit for TypeScript and Node.js.",
  },
  {
    name: "Supabase",
    description:
      "An open-source backend as a service providing authentication and database management.",
  },
  {
    name: "Jest",
    description:
      "A delightful JavaScript testing framework with a focus on simplicity.",
  },
  {
    name: "Shadcn UI",
    description:
      "Beautiful and customizable React components for modern web applications.",
  },
  {
    name: "Framer Motion",
    description: "A production-ready motion library for React.",
  },
  {
    name: "Toastify",
    description:
      "A library for providing toast notifications in your React applications.",
  },
  {
    name: "Zod",
    description: "TypeScript-first schema declaration and validation library.",
  },
  {
    name: "bcryptjs",
    description: "A library to help you hash passwords securely.",
  },
  {
    name: "dotenv",
    description:
      "Loads environment variables from a .env file into process.env.",
  },
];
