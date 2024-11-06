// Route - api/auth/sign-up
import dbConnect from "@/lib/dbConnect";
import { badRequest, conflict, internalServerError } from "@/types/ApiResponse";
import { randomUUID } from "crypto";
import { checkExistingUser, encryptPassword, generateVerificationToken, sendVerificationEmail, validateSignUpData } from "./service";
import { ZodError } from "zod";
import { createUser } from "@/models/user.model";

export async function POST(request: Request) {
  await dbConnect();
  const requestId = randomUUID();

  try {
    const { fullname, phone, email, password } = await request.json();

    // Validate user input data
    const validatedData = validateSignUpData({ fullname, phone, email, password });

    if (!validatedData.success) {
      return badRequest({ requestId, message: (validatedData.error as ZodError).issues[0].message });
    }

    // Check if user exists by email or phone
    const existingUser = await checkExistingUser({ email, phone });

    if (existingUser) {
      return conflict({ requestId, message: "Email or Phone already exists" });
    }

    // Register user
    const hash = await encryptPassword({password});

    const savedUser = await createUser({ fullname, phone, email, hash });

    const verificationToken = generateVerificationToken({ userId: savedUser.id });
    
    await sendVerificationEmail({email, verificationToken});

  } catch (error) {
    console.log("Error registering user", error);
    return internalServerError({ requestId });
  }
}
