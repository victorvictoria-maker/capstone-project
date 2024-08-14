"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LoginErrorPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Parse the URL hash
    const hash = window.location.hash.substring(1); // Remove the '#'
    const params = new URLSearchParams(hash);

    setError(params.get("error"));
    setErrorCode(params.get("error_code"));
    setErrorDescription(params.get("error_description"));
    setSuccess(params.get("success"));
  }, []);

  return (
    <div>
      <h1>Authentication Status</h1>
      {error && (
        <div className='text-red-600'>
          <p>
            <strong>Error:</strong> {decodeURIComponent(error)}
          </p>
          {errorCode && (
            <p>
              <strong>Error Code:</strong> {decodeURIComponent(errorCode)}
            </p>
          )}
          {errorDescription && (
            <p>
              <strong>Description:</strong>{" "}
              {decodeURIComponent(errorDescription)}
            </p>
          )}
        </div>
      )}
      {success && (
        <p className='text-green-600'>{decodeURIComponent(success)}</p>
      )}
      {!error && !success && <p>No message provided.</p>}
      <Link href='/login'>Login</Link>
    </div>
  );
};

export default LoginErrorPage;
