"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className='w-full '>
      <div className='container mx-auto px-4 flex items-center justify-between h-16'>
        {/* Logo */}
        <Link href='/'>
          <Image width={210} height={200} alt='Logo' src='/images/logo.png' />
        </Link>

        {/* Large screen nav */}
        <div className='hidden md:flex align-middle justify-center  space-x-8 border-b-[1px] border-b-[#7e7a7a] py-4 '>
          <Link href='/hospitals' className='hover:text-blue-600'>
            Hospitals
          </Link>
          <Link href='/admin' className='hover:text-blue-600'>
            Admin
          </Link>
          <Link href='/about ' className='hover:text-blue-600'>
            About Project
          </Link>
          {/* <Link href='/about' className='hover:text-blue-600'>
            Contact Us
          </Link> */}
        </div>

        {/* Signup button */}
        <div className='hidden md:block'>
          <Button variant='blue'>
            <Link href='/register'>Sign Up</Link>
          </Button>
        </div>

        {/* Hamburger icon for small screens */}
        <div className='md:hidden flex items-center'>
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className='w-6 h-6' />
            ) : (
              <HiMenuAlt1 className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? "0" : "100%" }}
          transition={{ duration: 0.3 }}
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden bg-white fixed top-0 right-0 h-full w-1/2 z-40 flex flex-col items-center justify-center space-y-8 shadow-lg`}
        >
          <button onClick={toggleMenu} className='absolute top-4 right-4'>
            <FaTimes className='w-6 h-6' />
          </button>

          <Link
            href='/hospitals'
            onClick={toggleMenu}
            className='text-2xl hover:text-blue-600'
          >
            Hospitals
          </Link>
          <Link
            href='/admin'
            onClick={toggleMenu}
            className='text-2xl hover:text-blue-600'
          >
            Admin
          </Link>
          <Link
            href='/about'
            onClick={toggleMenu}
            className='text-2xl hover:text-blue-600'
          >
            About Project
          </Link>
          {/* <Link
            href='/about'
            onClick={toggleMenu}
            className='text-2xl hover:text-blue-600'
          >
            Contact Us
          </Link> */}
          <Button variant='blue'>
            {" "}
            <Link href='/register' onClick={toggleMenu} className='text-white '>
              Sign Up
            </Link>
          </Button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
