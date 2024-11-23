"use server";

import * as z from "zod";
import RegisterSchema from "@/schemas/register-schema";
import { createUser, getUserByEmail, saveUser } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "@/lib/sendEmail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields" };
  }

  const { email, fullname, phone, password } = validatedFields.data;

  const existingUser = await getUserByEmail({ email });

  let savedUser = null;

  const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

  if (existingUser !== null) {
    if (existingUser?.emailVerified) {
      return { success: false, error: "Email or Phone already exists" };
    } else {
      existingUser.hash = hash;
      savedUser = await saveUser({ user: existingUser });
    }
  } else {
    savedUser = await createUser({ fullname, phone: Number(phone), email, hash });
  }

  const verificationToken = jwt.sign({ userId: savedUser.id, purpose: "email-verification" }, process.env.JWT_SECRET || "", { expiresIn: "24h" });

  const verificationUrl = `${process.env.SITE_URL}/verify-email?token=${verificationToken}`;

  sendOTPEmail({ email, subject: "Verify your email", verificationUrl });

  return { success: true, message: "User registered successfully" };
};
