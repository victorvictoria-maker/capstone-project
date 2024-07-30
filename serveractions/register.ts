"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";
import { getAllUsers, getUserByEmail } from "../fetchdatafromdb/getuser";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
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
  // const allUsers = await getAllUsers();
  // console.log("All users", allUsers);

  console.log(userExist);
  if (userExist) {
    return { error: "There is a user with this email!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //   do email verification later

  return { success: "Your account has been created successfully!" };
};
