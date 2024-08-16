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
        <Link href='/'>
          <Image width={150} height={150} alt='Logo' src='/images/logo.png' />
        </Link>

        <div className='flex space-x-4'>
          <Link href='https://facebook.com' aria-label='Facebook'>
            <FaFacebookF className='text-white hover:text-blue-600 w-6 h-6' />
          </Link>
          <Link href='https://twitter.com' aria-label='Twitter'>
            <FaTwitter className='text-white hover:text-blue-400 w-6 h-6' />
          </Link>
          <Link href='https://instagram.com' aria-label='Instagram'>
            <FaInstagram className='text-white hover:text-pink-500 w-6 h-6' />
          </Link>
          <Link href='https://linkedin.com' aria-label='LinkedIn'>
            <FaLinkedinIn className='text-white hover:text-blue-700 w-6 h-6' />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
