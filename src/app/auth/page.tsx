"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const LoginErrorPageContent = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success");

  return (
    <div>
      <h1>Authentication Status</h1>
      {error && <p className='text-red-600'>{decodeURIComponent(error)}</p>}
      {success && (
        <p className='text-green-600'>{decodeURIComponent(success)}</p>
      )}
      {!error && !success && <p>No message provided.</p>}
      <Link href='/login'>Login</Link>
    </div>
  );
};

const LoginErrorPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginErrorPageContent />
    </Suspense>
  );
};

export default LoginErrorPage;
