// pages/auth/reset-password.tsx
// "use client";

import { useState } from "react";
import { resetPassword } from "../../../serveractions/resetpassword";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      setMessage("Check your email for a link to reset your password.");
    } catch (error) {
      setMessage("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email'
      />
      <button onClick={handleResetPassword}>Send Reset Link</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
