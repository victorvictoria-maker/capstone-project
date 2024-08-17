"use client";

import Navbar from "@/components/hospitals/landingpage/navbar";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gradient-to-b from-[#EFCB68] via-white to-[#456DFF] text-gray-800 p-6'>
        {/* Hero Section */}
        <section className='text-center py-6'>
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='text-5xl font-extrabold  mb-4'
          >
            Care Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className='text-2xl  font-medium'
          >
            Finding the right care for you.
          </motion.p>
        </section>

        {/* Project Details */}
        <section className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 my-16'>
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
              nearby. The platform supports searching, filtering, and sharing
              results, with a special admin panel for managing hospital records.
              This project is the capstone for Alt School&apos;s final semester
              and leverages modern web technologies to create a seamless user
              experience.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='bg-white p-8 rounded-lg shadow-lg'
          >
            <h2 className='text-3xl font-bold text-[#456DFF] mb-4'>Features</h2>
            <ul className='list-disc ml-5 space-y-2 text-lg'>
              <li>Hospital search by location and type</li>
              <li>Filtering by state and hospital type</li>
              <li>Copy and export filtered results</li>
              <li>Admin panel for creating, editing, and updating hospitals</li>
              <li>Email/password and OAuth authentication (Google, GitHub)</li>
              <li>Responsive design for all devices</li>
              <li>SEO optimized for better search visibility</li>
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
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
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
            className='inline-block px-10 py-4 rounded-full bg-[#EFCB68] text-gray-800 font-semibold shadow-lg'
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
