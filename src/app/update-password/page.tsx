// pages/auth/update-password.tsx
// "use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { updatePassword } from "../../../serveractions/updatepassword";

const UpdatePasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdatePassword = async () => {
    const { query } = router;
    const { access_token } = query; // Extract the token from the URL

    if (!access_token) {
      setError("Invalid or missing token.");
      return;
    }

    try {
      await updatePassword(password, access_token as string);
      setSuccess("Password updated successfully.");
    } catch (error) {
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <div>
      <h1>Update Password</h1>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter your new password'
      />
      <button onClick={handleUpdatePassword}>Update Password</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default UpdatePasswordPage;
