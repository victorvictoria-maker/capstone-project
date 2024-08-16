import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const HospitalListFooter = () => {
  return (
    <footer className='bg-gradient-to-r from-[#000] via-[#456DFF] to-[#000] p-4 flex flex-col items-center'>
      <div className='mb-4'>
        <Image
          src='/images/logo.png'
          alt='Logo'
          width={150}
          height={150}
          className='object-contain'
        />
      </div>

      <div className='flex space-x-4 mb-4'>
        <a href='https://facebook.com' aria-label='Facebook'>
          <FaFacebookF className='text-white hover:text-blue-600 w-6 h-6' />
        </a>
        <a href='https://twitter.com' aria-label='Twitter'>
          <FaTwitter className='text-white hover:text-blue-400 w-6 h-6' />
        </a>
        <a href='https://instagram.com' aria-label='Instagram'>
          <FaInstagram className='text-white hover:text-pink-500 w-6 h-6' />
        </a>
        <a href='https://linkedin.com' aria-label='LinkedIn'>
          <FaLinkedinIn className='text-white hover:text-blue-700 w-6 h-6' />
        </a>
      </div>

      <p className='text-white text-center text-sm'>
        &copy; {new Date().getFullYear()} Care Connect. All rights reserved.
      </p>
    </footer>
  );
};

export default HospitalListFooter;
