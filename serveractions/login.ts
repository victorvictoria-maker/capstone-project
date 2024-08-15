"use server";

import { createClient } from "@/utils/supabase/server";
import { LoginSchema } from "../schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../fetchdatafromdb/getuser";
import { redirect } from "next/navigation";

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
    // console.log(existingUser);
    return { success: "Login successful!", userRole: existingUser.role };
  } catch (error) {
    console.error("Unexpected Login Error:", error);
    return {
      error: "Something went wrong, check your credentials and try again!",
    };
  }
};

// import { Provider } from "@supabase/supabase-js";

// Define the providers you support
type OAuthProvider = "google" | "github"; // Add other providers if needed

export const loginWithOAuth = async (provider: OAuthProvider) => {
  const supabase = createClient();
  // console.log(provider);

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error("Supabase OAuth Error:", error.message);
      return { error: error.message || "OAuth login failed!" };
    }

    // console.log("data", data);
    return { url: data.url, success: "OAuth login successful!" };
  } catch (error) {
    console.error("Unexpected OAuth Error:", error);
    return { error: "Something went wrong with OAuth login!" };
  }
};

//   phone_number: phoneNumber,
//   state: {
//     id: selectedState,
//     name: states.find((state) => state.id === selectedState)?.name || "",
//   },
//   stateId: selectedState,
//   tier: {
//     id: selectedTier,
//     name: tiers.find((tier) => tier.id === selectedTier)?.name || "",
//   },
//   tierId: selectedTier,
//   type: {
//     id: selectedType,
//     name: types.find((type) => type.id === selectedType)?.name || "",
//   },
//   typeId: selectedType,
