import { sendWelcomeEmail } from "@/lib/sendEmail";
import verifyEmailSchema from "@/schemas/verify-email-schema";
import jwt from "jsonwebtoken";

// Validate user input data
export function validateVerifyEmailData(data: { token: string }) {
  try {
    const validatedData = verifyEmailSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, error };
  }
}

// Verify token
export function verifyToken({ token }: { token: string }): { userId: string; purpose: string } | null {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { userId: string; purpose: string };
  return decoded;
}

// Send welcome email
export async function sendVerificationEmail({ email }: { email: string }) {
  await sendWelcomeEmail({ email });
}
