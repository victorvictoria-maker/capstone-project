import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ErrorNotFound() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <Image
          src='/images/front-view-hands-pressing-buzzer.jpg'
          alt='Page Not Found'
          width={350}
          height={350}
          className='mx-auto'
        />
        <h1 className={cn("text-4xl font-bold text-[#456DFF] mt-8 mb-4")}>
          Oops! Page Not Found
        </h1>
        <p className={cn("text-xl text-[#456DFF] mb-8")}>
          The page you are looking for does not exist.
        </p>
        <Button className='bg-[#04A5BA] text-white hover:bg-[#04A5BA]/80'>
          <Link href='/'> Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
