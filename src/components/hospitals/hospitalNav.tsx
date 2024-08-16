import Image from "next/image";
import { LogoutButton } from "../LogoutButton";

const HospitalNav = ({
  email,
  profilePicture,
}: {
  email: string;
  profilePicture: string;
}) => {
  return (
    <nav className='bg-gradient-to-r from-[#000] via-[#456DFF] to-[#000] p-4 flex items-center justify-between'>
      {/* Left: User Greeting */}
      <div className='flex items-center'>
        <p className='text-white text-lg'>Hi 👋, {email}</p>
      </div>

      {/* Center: Finding Hospitals Line */}
      <div className='flex-1 text-center hidden lg:block'>
        <div className='text-white text-xl font-semibold animate-slideInLeft'>
          Discover the best hospitals near you...
        </div>
      </div>

      {/* Right: Logout Button */}
      <div className='flex items-center'>
        <Image
          src={profilePicture}
          alt='User Profile Picture'
          width={40}
          height={40}
          className='rounded-full mr-2'
        />

        <LogoutButton />
      </div>
    </nav>
  );
};

export default HospitalNav;
