"use server";

import { createClient } from "@/utils/supabase/server";

export const resetPassword = async (email: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/update-password`,
      // redirectTo: "http://localhost:3000/update-password",
    });

    if (error) {
      console.error("Reset Password Email:", error.message);
      return { error: error.message || "Could not send password reset email!" };
    } else {
      console.log("Password reset email sent successfully!");
      return { success: "Password reset email sent successfully!" };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      error: "Something went wrong, could not send password reset email!",
    };
  }
};
