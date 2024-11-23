import { sendOTPEmail } from "@/lib/sendEmail";
import signUpSchema from "@/schemas/register-schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Validate user sign-up data
export function validateSignUpData(data: { fullname: string; phone: string; email: string; password: string }) {
  try {
    const validatedData = signUpSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, error };
  }
}

// Encrypt password
export async function encryptPassword({ password }: { password: string }): Promise<string> {
  return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
}

// Generate verification token
export async function generateVerificationToken({ userId }: { userId: string }): Promise<string> {
  const token = jwt.sign({ userId, purpose: "email-verification" }, process.env.JWT_SECRET || "", { expiresIn: "24h" });
  return token;
}

// Send verification email
export async function sendVerificationEmail({ email, verificationToken }: { email: string; verificationToken: string }) {
  const verificationUrl = `${process.env.SITE_URL}/verify-email?token=${verificationToken}`;
  await sendOTPEmail({ email, subject: "Verify your email", verificationUrl });
}
