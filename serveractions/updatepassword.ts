// serveractions/updatepassword.ts
import { createClient } from "@/utils/supabase/server";

export const updatePassword = async (
  newPassword: string,
  accessToken: string
) => {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }
};
