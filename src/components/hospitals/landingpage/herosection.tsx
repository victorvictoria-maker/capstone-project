"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { GiHospital } from "react-icons/gi";
import { TbBuildingEstate } from "react-icons/tb";
import { MdOutlineBloodtype } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getAllHealthcareProvider } from "../../../fetchdatafromdb/gethospitals";
import { getNumberOfHospitals } from "../../../serveractions/hospitals";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Hospitaltypes from "./hospitaltypes";
// import PsychiatryIcon from "/images/psychiatry.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Herosection = () => {
  const [hospitalCount, setHospitalCount] = useState<number | undefined>(
    undefined
  );

  // Scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // useEffect(() => {
  //   const fetchHospitalCount = async () => {
  //     const noOfHospitals = await getNumberOfHospitals();
  //     console.log(noOfHospitals);
  //     setHospitalCount(noOfHospitals);
  //   };

  //   fetchHospitalCount();
  //   console.log(hospitalCount);
  // }, [hospitalCount]);

  // const formattedHospitalCount =
  //   hospitalCount !== undefined ? hospitalCount.toLocaleString() : undefined;

  return (
    <div>
      {/* Section 1: Hero Section */}
      <motion.section
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className='max-w-[1400px] mx-auto flex flex-col md:flex-row items-center py-6 md:py-12 px-4'>
          <motion.div
            className='text-content md:w-1/2 space-y-4'
            variants={fadeInUp}
          >
            <p className='flex items-center text-red-600'>
              <span className='icon-love mr-1'>❤️</span> Health Comes First
            </p>
            <h1 className='text-4xl md:text-7xl font-bold md:pb-4'>
              Care Connect: <br /> Finding the right care for you
            </h1>
            <p className=' md:pb-12 md:w-4/5 text-gray-700'>
              Our mission is to connect you with the best healthcare options,
              ensuring you get the care you deserve. With thousands of hospitals
              and healthcare centers across the country, Care Connect is your
              trusted companion in finding the best care.
            </p>
            <div className=' space-x-6 '>
              <Button variant='blue' size='lg'>
                <Link href='/login'>Find Hospitals</Link>
              </Button>
              <Button variant='white' size='lg'>
                <Link href='/about'> About Project</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className='images md:w-1/2 flex justify-center gap-2 md:gap-4 items-center mt-8 md:mt-0 relative'
            variants={fadeInUp}
          >
            <div className='w-1/3 relative'>
              <Image
                src='/images/image.png'
                alt='Small Image'
                className='object-cover w-full h-full'
                width={200}
                height={500}
              />
            </div>

            <div className='w-2/3 relative'>
              <Image
                src='/images/image2.png'
                alt='Large Image'
                className='object-cover w-full h-full'
                width={300}
                height={500}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 2: Statistics Section */}
      <motion.section
        className='max-w-[1400px] mx-auto bg-gray-100 py-8 my-2 px-4'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className=' mx-auto flex flex-col md:flex-row  gap-8 justify-between items-center space-y-2 md:space-y-0 md:space-x-4'>
          <motion.div
            className='flex flex-col md:flex-row md:gap-4 items-center text-center flex-1 justify-center'
            variants={fadeInUp}
          >
            <div className='bg-[#04A5BA] p-6 rounded-md'>
              <GiHospital size={24} color='white' />
            </div>
            <div className='mt-4'>
              <p
                className='font-bold text-xl text-[#04A5BA]'
                data-target='2000'
              >
                {/* <span>{formattedHospitalCount}</span> + */}
                2,000+
              </p>
              <p className='font-bold'>Hospitals</p>
            </div>
          </motion.div>

          <motion.div
            className='flex flex-col md:flex-row md:gap-4  items-center text-center flex-1 justify-center'
            variants={fadeInUp}
          >
            <div className='bg-[#EFCB68] p-6 rounded-md'>
              <TbBuildingEstate size={24} color='white' />
            </div>
            <div className='mt-4'>
              <p
                className='font-bold text-xl text-[#EFCB68]'
                data-target='24000'
              >
                37
              </p>
              <p className='font-bold'>States Covered</p>
            </div>
          </motion.div>

          <motion.div
            className='flex flex-col md:flex-row md:gap-4  items-center text-center flex-1   justify-center'
            variants={fadeInUp}
          >
            <div className='bg-[#456DFF] p-6 rounded-md'>
              <MdOutlineBloodtype size={24} color='white' />
            </div>
            <div className='mt-4'>
              <p className='font-bold text-xl text-[#456DFF]' data-target='10'>
                10+
              </p>
              <p className='font-bold'>Healthcare Types</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 3: Feedback Section */}
      <motion.section
        className='feedback-section bg-white py-16'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className='container mx-auto flex flex-col md:flex-row gap-8 items-center'>
          {/* Left: Image */}
          <motion.div className='image md:w-1/2' variants={fadeInUp}>
            <Image
              src='/images/image3.png'
              alt='Feedback Image'
              className='w-full'
              width={400}
              height={400}
            />
            {/* <Image width={210} height={200} alt='Logo' src='/images/logo.png' /> */}
          </motion.div>
          {/* Right: Text and Cards */}
          <motion.div
            className='text-content md:w-1/2 space-y-6 mt-4 md:mt-0 '
            variants={fadeInUp}
          >
            <h2 className='text-xl md:text-3xl font-bold'>
              We care for you. We connect you to well-being. Your partner in
              health.
            </h2>
            <p className='text-gray-700'>
              At Care Connect, we are dedicated to supporting your healthcare
              journey with essential information and resources. Our goal is to
              make finding the right care easier by providing accurate,
              up-to-date details on hospitals and healthcare providers. Trust us
              to guide you every step of the way, ensuring you have the tools
              you need to make informed health decisions.
            </p>
            <div className='feedback-cards grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='feedback-card p-4 bg-blue-50'>
                <p className='text-lg font-semibold'>Positive Feedback</p>
                <div className='progress-bar bg-[#456DFF] w-3/4 h-2 rounded-full mt-2'></div>
                <p className='mt-2 text-gray-700'>90% satisfaction rate</p>
              </div>
              <div className='feedback-card p-4 bg-blue-50'>
                <p className='text-lg font-semibold'>Experienced Doctors</p>
                <div className='progress-bar bg-[#04A5BA] w-4/5 h-2 rounded-full mt-2'></div>
                <p className='mt-2 text-gray-700'>2,000+ doctors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 4: Hospital Types Section*/}
      <Hospitaltypes />

      {/* Section 5: What you would get Section */}
      <motion.section
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className='max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:py-12 px-4 my-4'>
          <motion.div
            className=' lg:w-2/3 space-y-4 lg:pr-16 pt-3 mb-4'
            variants={fadeInUp}
          >
            <h2 className='text-xl md:text-3xl font-bold'>
              Uncover the Best Healthcare Services
            </h2>
            <p className='text-gray-700'>
              Care Connect helps you find the best healthcare providers. From
              hospitals to specialist clinics, we’ve got you covered.
            </p>
            <ul className='space-y-2 text-gray-700'>
              <li className='flex  items-center gap-1'>
                <FaCheck /> Thousands of hospitals
              </li>
              <li className='flex  items-center gap-1'>
                <FaCheck /> Nationwide coverage
              </li>
              <li className='flex  items-center gap-1'>
                <FaCheck /> Trusted healthcare providers
              </li>
              <li className='flex  items-center gap-1'>
                <FaCheck /> Easy search functionality
              </li>
              <li className='flex  items-center gap-1'>
                <FaCheck /> Detailed hospital profiles
              </li>
            </ul>
            <Button variant='blue' size='lg'>
              <Link href='/hospitals'>Learn More</Link>
            </Button>
          </motion.div>
          <motion.div
            className='lg:w-1/2 flex flex-col items-center relative h-full w-full '
            variants={fadeInUp}
          >
            <div className=' lg:w-13/  flex flex-col gap-4 w-full md:justify-center md:items-center  lg:flex-row'>
              <div>
                <Image
                  src='/images/medical-team-discussing-with-african-american-sick-patient.jpg'
                  alt='Image 1'
                  className=' w-full h-full rounded-md'
                  width={300}
                  height={500}
                />
              </div>
              <div className='flex flex-col gap-4 md:flex-row lg:flex-col'>
                <Image
                  src='/images/clean-empty-hospital-ward-ready-receive-patients-reflecting-modern-medical-care.jpg'
                  alt='Image 1'
                  className=' w-full h-full rounded-md'
                  width={300}
                  height={500}
                />
                <Image
                  src='/images/african-american-doctor-doing-checkup-visit-with-female-wheelchair.jpg'
                  alt='Image 1'
                  className=' w-full h-full rounded-md'
                  width={400}
                  height={600}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Herosection;
