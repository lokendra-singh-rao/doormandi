import dbConnect from "@/lib/dbConnect";
import { badRequest, internalServerError, notFound, success } from "@/types/ApiResponse";
import { randomUUID } from "crypto";
import { ZodError } from "zod";
import { getUserByEmailOrPhone } from "@/models/user.model";
import { generateToken, validateLoginData, verifyPassword } from "./service";

export async function POST(request: Request) {
  await dbConnect();
  const requestId = randomUUID();

  try {
    const { email, phone, password } = await request.json();

    // Validate user login data
    const validatedData = validateLoginData({ email, phone, password });

    if (!validatedData.success) {
      return badRequest({ requestId, message: (validatedData.error as ZodError).issues[0].message });
    }

    // Check if user exists by email or phone
    const user = await getUserByEmailOrPhone({ emailOrPhone: email || phone });

    if(!user) {
      return notFound({ requestId, message: "User not found" });
    }

    if(!user.emailVerified) {
      return badRequest({ requestId, message: "Email not verified, check your mailbox for verification email" });
    }

    // Verify password
    await verifyPassword({ password, hash: user.hash });

    // Generate JWT token
    const token = await generateToken({ userId: user.id, email: user.email, phone: user.phone, fullname: user.fullname, role: user.role });

    // Set token in cookies
    const response = new Response(JSON.stringify({ requestId, message: "Login successful" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
      }
    });

    return response;

    return success({ requestId, message: "Email verified successfully" });

  } catch (error) {
    console.log("Error registering user", error);
    return internalServerError({ requestId });
  }
}
