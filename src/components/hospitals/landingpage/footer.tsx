import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='w-full bg-gray-900 text-white py-6'>
      <div className='container  px-4 flex flex-col md:flex-row mx-auto justify-between items-center  space-y-4 '>
        <h1 className='text-2xl md:text-4xl text-white font-bold'>
          Care Connect
        </h1>

        <div className='flex space-x-4'>
          <Link href='/' aria-label='Facebook'>
            <FaFacebookF className='text-white hover:text-blue-600 w-6 h-6' />
          </Link>
          <Link href='/' aria-label='Twitter'>
            <FaTwitter className='text-white hover:text-blue-400 w-6 h-6' />
          </Link>
          <Link href='/' aria-label='Instagram'>
            <FaInstagram className='text-white hover:text-pink-500 w-6 h-6' />
          </Link>
          <Link href='/' aria-label='LinkedIn'>
            <FaLinkedinIn className='text-white hover:text-blue-700 w-6 h-6' />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
