import { badRequest, conflict, internalServerError, success } from "@/types/ApiResponse";
import { randomUUID } from "crypto";
import { encryptPassword, generateVerificationToken, sendVerificationEmail, validateSignUpData } from "./service";
import { ZodError } from "zod";
import { createUser, getUserByEmailOrPhone, saveUser } from "@/models/user.model";
import client from "@/lib/mongodb";
import dbConnect from "@/lib/mongodb";

export async function POST(request: Request) {
  await dbConnect()
  const requestId = randomUUID();
  try {
    const { fullname, phone, email, password } = await request.json();

    // Validate user sign-up data
    const validatedData = validateSignUpData({ fullname, phone, email, password });

    if (!validatedData.success) {
      return badRequest({ requestId, message: (validatedData.error as ZodError).issues[0].message });
    }

    // Check if user exists by email or phone
    const existingUser = await getUserByEmailOrPhone({ email, phone });

    const hash = await encryptPassword({ password });
    let savedUser = null;
    
    if (existingUser !== null) {
      if (existingUser?.emailVerified || existingUser?.phone === phone || existingUser?.email === email) {
        return conflict({ requestId, message: "Email or Phone already exists" });
      } else {
        existingUser.hash = hash;
        savedUser = await saveUser({ user: existingUser });
      }
    } else {
      savedUser = await createUser({ fullname, phone, email, hash });
    }

    const verificationToken = await generateVerificationToken({ userId: savedUser.id });

    sendVerificationEmail({ email, verificationToken });

    return success({ data: savedUser, requestId, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    return internalServerError({ requestId });
  }
}
