import { sendOTPEmail } from "@/lib/sendEmail";
import { getUserByEmailOrPhone } from "@/models/user.model";
import signUpSchema from "@/schemas/signUpSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Validate user input data
export function validateSignUpData(data: { fullname: string; phone: string; email: string; password: string }) {
  try {
    const validatedData = signUpSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, error };
  }
}

// Check if user exists by email or phone
export async function checkExistingUser({ email, phone }: { email: string; phone: string }): Promise<boolean> {
  const existingUser = await getUserByEmailOrPhone({ emailOrPhone: email || phone });
  return !!existingUser;
}

// Encrypt password
export async function encryptPassword({ password }: { password: string }): Promise<string> {
  return await bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS || 10);
}

// Generate verification token
export function generateVerificationToken({ userId }: { userId: string }): string {
  const token = jwt.sign({ userId, purpose: "email-verification" }, process.env.JWT_SECRET || "", { expiresIn: "24h" });
  return token;
}

// Verify token
export function verifyToken({ token }: { token: string }): { userId: string; purpose: string } | null {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { userId: string; purpose: string };
  return decoded;
}

// Send verification email
export async function sendVerificationEmail({ email, verificationToken }: { email: string; verificationToken: string }) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;
  await sendOTPEmail({ email, subject: "Verify your email", otp: verificationUrl });
}
