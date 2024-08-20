import { FaStar } from "react-icons/fa";
import { FiFilter, FiCopy } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { MdUnfoldMoreDouble } from "react-icons/md";

const SkeletonLoader = () => {
  return (
    <>
      {/* Hospitals List Skeleton */}
      <ul className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <li
              key={index}
              className='p-4 bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-300 animate-pulse'
            >
              <div className='hospital-name text-2xl font-bold text-gray-300 mb-2 h-6 bg-gray-300 rounded'></div>
              <div className='hospital-name text-xl font-bold text-gray-300 mb-2 min-h-[60px] h-6 bg-gray-300 rounded'></div>
              <div className='hospital-name text-lg font-bold text-gray-300 mb-2 h-6 bg-gray-300 rounded'></div>
              <div className='hospital-type text-sm text-gray-300'>
                <span className='font-semibold text-gray-400'>Type:</span>{" "}
                <div className='w-24 h-6 bg-gray-300 rounded'></div>
              </div>
              <div className='hospital-tier text-sm text-gray-300'>
                <span className='font-semibold text-gray-400'>State:</span>{" "}
                <div className='w-24 h-6 bg-gray-300 rounded'></div>
              </div>
              <div className='hospital-tier text-sm text-gray-300 mt-2'>
                <div className='flex'>
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className='text-gray-300' />
                  ))}
                </div>
              </div>

              {/* Admin Buttons Skeleton */}
              <div className='flex space-x-4 mt-4'>
                <div className='w-24 h-8 bg-gray-300 rounded'></div>
                <div className='w-24 h-8 bg-gray-300 rounded'></div>
              </div>
            </li>
          ))}
      </ul>

      {/* Load More Button Skeleton */}
      <div className='flex justify-center mt-6'>
        <div className='w-40 h-12 bg-gray-300 rounded'></div>
      </div>
    </>
  );
};

export default SkeletonLoader;
