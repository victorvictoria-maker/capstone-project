"use client";

import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

const hospitalTypes = [
  {
    title: "Clinic",
    description:
      "Small healthcare facility for routine care and minor treatments.",
    icon: "/images/health-clinic.png",
  },
  {
    title: "Optical Center",
    description: "Specialized in eye care and vision services.",
    icon: "/images/eye.png",
  },
  {
    title: "Hospital",
    description:
      "Comprehensive medical facility offering a wide range of services.",
    icon: "/images/hospital.png",
  },
  {
    title: "Psychiatry Care Center",
    description: "Focused on psychiatric care and mental health treatment.",
    icon: "/images/brain.png",
  },
  {
    title: "Dental Clinic",
    description: "Focused on oral health and dental treatments.",
    icon: "/images/teeth.png",
  },
  {
    title: "Dermatological Center",
    description: "Specializes in skin care and treatment of skin conditions.",
    icon: "/images/hydrating.png",
  },
  {
    title: "Psychological Center",
    description: "Offers mental health services and counseling.",
    icon: "/images/brain.png",
  },
  {
    title: "Physiotherapy Center",
    description: "Provides rehabilitation and physical therapy services.",
    icon: "/images/wrist.png",
  },
  {
    title: "Orthopedic Center",
    description: "Focuses on musculoskeletal health and treatment.",
    icon: "/images/bones.png",
  },
  {
    title: "Tertiary Care Center",
    description:
      "Advanced medical care facilities with specialized treatments.",
    icon: "/images/hospital.png",
  },
  {
    title: "ENT",
    description: "Specialized care for ear, nose, and throat conditions.",
    icon: "/images/deaf.png",
  },
];

const Hospitaltypes = () => {
  const scrollRefState = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className='w-full py-8 md:py-20 lg:py-28 bg-[#456DFF]/10'>
      <div className='container'>
        <h2 className='text-3xl lg:text-5xl font-bold text-center mb-8'>
          Find the Perfect Healthcare Option
        </h2>
        <div className='relative'>
          <FiChevronLeft
            className='absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-white rounded-full p-1 shadow'
            size={24}
            onClick={() => scrollLeft(scrollRefState)}
          />
          <div className='flex overflow-hidden gap-2 mx-6' ref={scrollRefState}>
            {hospitalTypes.map((type, index) => (
              <motion.div
                key={index}
                className='bg-white rounded-lg p-4 shadow-md flex-shrink-0 w-[300px] flex flex-col items-center space-y-4 animate-scroll'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={type.icon}
                  alt={type.title}
                  height={80}
                  width={80}
                  className='object-cover'
                />
                <h3 className='text-xl font-semibold text-[#04A5BA]'>
                  {type.title}
                </h3>
                <p className='text-gray-700 text-center'>{type.description}</p>
              </motion.div>
            ))}
          </div>
          <FiChevronRight
            className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-white rounded-full p-1 shadow'
            size={24}
            onClick={() => scrollRight(scrollRefState)}
          />
        </div>
      </div>
    </section>
  );
};

export default Hospitaltypes;
