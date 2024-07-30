"use server";

import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { signIn } from "../auth";
import { LoginSchema } from "../schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getAllUsers, getUserByEmail } from "../fetchdatafromdb/getuser";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  //   console.log(email, password);

  const existingUser = await getUserByEmail(email);
  console.log("existingUser", existingUser);

  //   const allUsers = await getAllUsers();
  //   console.log("All users", allUsers);

  if (!existingUser || !existingUser.email || !existingUser?.password) {
    return { error: "There is no user with this email!" };
  }

  //   console.log(existingUser);

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (existingUser && !passwordMatch) {
    return { error: "Invalid password" };
  }

  //   console.log(passwordMatch);

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Something went wrong, check your credentails and try again !",
      };
    }

    throw error;
  }
};
