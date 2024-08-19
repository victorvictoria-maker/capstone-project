"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <Image
          src='/images/front-view-hands-pressing-buzzer.jpg'
          alt='Something Went Wrong'
          width={350}
          height={350}
          className='mx-auto rounded-md'
        />
        <h1 className={cn("text-4xl font-bold text-red-600 mt-8 mb-4")}>
          Ops. Something Went Wrong
        </h1>
        <p className={cn("text-xl text-gray-500 mb-8")}>
          We&apos;re sorry, but something went wrong on our end. Please try
          again.
        </p>

        <Button
          variant='outline'
          className='bg-blue-600 text-white hover:bg-blue-700'
        >
          <Link href='/'> Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
