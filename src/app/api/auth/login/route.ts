import { signIn } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { getUserByEmailOrPhone } from "@/models/user.model";
import LoginSchema from "@/schemas/login-schema";
import { badRequest, internalServerError, success } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { ZodError } from "zod";

export async function POST(request: Request) {
  await dbConnect();
  const requestId = randomUUID();

  try {
    const { email, phone, password } = await request.json();

    // Validate user login data
    const validatedData = LoginSchema.safeParse({ email, phone, password });

    if (!validatedData.success) {
      return badRequest({ requestId, message: (validatedData.error as ZodError).issues[0].message });
    }

    // Check if user exists by email or phone
    const user = await getUserByEmailOrPhone({ emailOrPhone: email || phone });

    if (!user) {
      return badRequest({ requestId, message: "Email or Password incorrect" });
    }

    if (!user.emailVerified) {
      return badRequest({ requestId, message: "Email not verified, check your mailbox for verification email" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.hash);

    if(!passwordMatch) {
      return badRequest({ requestId, message: "Email or Password incorrect" });
    }

    // Generate auth from NextAuth
    await signIn("credentials", { ...{ name: user.fullname, email }, redirect: false });

    return success({ requestId, message: "Login successful" });
  } catch (error) {
    console.log("Error registering user", error);
    return internalServerError({ requestId });
  }
}
