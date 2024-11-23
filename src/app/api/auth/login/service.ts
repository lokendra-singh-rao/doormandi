import loginSchema from "@/schemas/login-schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Validate user login data
export function validateLoginData(data: { phone: string; email: string; password: string }) {
  try {
    const validatedData = loginSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, error };
  }
}

// Verify encrypted password
export async function verifyPassword({ password, hash }: { password: string; hash: string }) {
  return await bcrypt.compare(password, hash);
}

// Generate JWT token
export async function generateToken(data: { userId: string, email: string, phone: string, fullname: string, role: string }) {
  return jwt.sign(data, process.env.JWT_SECRET || "", { expiresIn: "7d", subject: "login", issuer: "doormandi", audience: "user" });
}
