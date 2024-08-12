"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";
import { getAllUsers, getUserByEmail } from "../fetchdatafromdb/getuser";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const supabase = createClient();
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userExist = await getUserByEmail(email);

  if (userExist) {
    return { error: "There is a user with this email!" };
  }

  // Register user with Supabase
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Store user information in Prisma
  await db.user.create({
    data: {
      id: user.user?.id,
      name,
      email,
      password: hashedPassword,
      role: "USER",
    },
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");

  return { success: "Your account has been created successfully!" };
};
