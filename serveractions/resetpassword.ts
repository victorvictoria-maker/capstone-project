import { createClient } from "@/utils/supabase/server";

export const resetPassword = async (email: string) => {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/update-password",
  });

  if (error) {
    throw new Error(error.message);
  }
};