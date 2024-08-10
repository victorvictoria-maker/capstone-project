"use server";

import { createClient } from "@/utils/supabase/server";
import { LoginSchema } from "../schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../fetchdatafromdb/getuser";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const supabase = createClient();

  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "There is no user with this email!" };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: "Invalid password" };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase Auth Error:", error.message);
      return { error: error.message || "Login failed!" };
    }

    console.log("User login successful");
    return { success: "Login successful!" };
  } catch (error) {
    console.error("Unexpected Login Error:", error);
    return {
      error: "Something went wrong, check your credentials and try again!",
    };
  }
};
