"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const LoginErrorPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    setError(params.get("error"));
    setErrorCode(params.get("error_code"));
    setErrorDescription(params.get("error_description"));
    setSuccess(params.get("success"));
  }, []);

  return (
    <div className='flex flex-col h-screen items-center gap-4 justify-center'>
      {!error && !success && (
        <>
          <Image
            src='/images/front-view-hands-pressing-buzzer.jpg'
            alt='Something Went Wrong'
            width={350}
            height={350}
            className='mx-auto rounded-md'
          />
          <h1 className={cn("text-4xl font-bold text-red-600 mt-8 mb-4")}>
            Ops. Something Went Wrong!
          </h1>
          <Button
            variant='outline'
            className='bg-blue-600 text-white hover:bg-blue-700'
          >
            <Link href='/login'> Go Home</Link>
          </Button>
        </>
      )}
      {error && (
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
            <strong>Error:</strong> {decodeURIComponent(error)}
          </p>
          {errorCode && (
            <p className={cn("text-xl text-gray-500 mb-8")}>
              <strong>Error Code:</strong> {decodeURIComponent(errorCode)}
            </p>
          )}
          {errorDescription && (
            <p className={cn("text-xl text-gray-500 mb-8")}>
              <strong>Description:</strong>{" "}
              {decodeURIComponent(errorDescription)}
            </p>
          )}
          <Button
            variant='outline'
            className='bg-blue-600 text-white hover:bg-blue-700'
          >
            <Link href='/login'> Go Home</Link>
          </Button>
        </div>
      )}
      {success && (
        <p className='text-green-600'>{decodeURIComponent(success)}</p>
      )}
    </div>
  );
};

export default LoginErrorPage;
