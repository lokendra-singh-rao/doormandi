import dbConnect from "@/lib/dbConnect";
import { badRequest, internalServerError, notFound, success } from "@/types/ApiResponse";
import { randomUUID } from "crypto";
import { sendVerificationEmail, validateVerifyEmailData, verifyToken } from "./services";
import { ZodError } from "zod";
import { getUserById } from "@/models/user.model";

export async function POST(request: Request) {
  await dbConnect();
  const requestId = randomUUID();

  try {
    const { token } = await request.json();

    // Validate user sign-up data
    const validatedData = validateVerifyEmailData({ token });

    if (!validatedData.success) {
      return badRequest({ requestId, message: (validatedData.error as ZodError).issues[0].message });
    }

    const decodedToken = verifyToken({ token });

    if(decodedToken?.purpose !== "email-verification") {
      return badRequest({ requestId, message: "Invalid token" });
    }

    const user = await getUserById({ id: decodedToken.userId });

    if(!user) {
      return notFound({ requestId, message: "User not found" });
    }

    if(user.emailVerified) {
      return badRequest({ requestId, message: "Email already verified" });
    }

    user.emailVerified = true;
    await user.save();

    sendVerificationEmail({ email: user.email });

    return success({ requestId, message: "Email verified successfully" });

  } catch (error) {
    console.log("Error registering user", error);
    return internalServerError({ requestId });
  }
}
