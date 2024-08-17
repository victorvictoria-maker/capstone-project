"use server";

import { createClient } from "@/utils/supabase/server";
import * as z from "zod";
import { UpdatePasswordSchema } from "../../schemas";

export const updatePassword = async (
  values: z.infer<typeof UpdatePasswordSchema>
) => {
  const supabase = createClient();
  const { password } = values;

  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("Reset Password Failed:", error.message);
      return { error: error.message || "Could not reset passsword!" };
    } else {
      console.log("Password reset done successfully!");
      return { success: "Password reset done successfully!" };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      error: "Something went wrong, could not reset password!",
    };
  }
};
