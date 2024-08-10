export default function Loading() {
  return (
    <div className='flex justify-center items-center '>
      <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500'></div>
      <p className='ml-4 text-lg text-gray-700'>Loading hospitals...</p>
    </div>
  );
}
