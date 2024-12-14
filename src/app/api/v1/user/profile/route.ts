import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { internalServerError, success } from "@/types/ApiResponse";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  await dbConnect();
  const requestId = randomUUID();

  try {
    const session = await auth();
    
    


    return success({ requestId, message: "Email verified successfully" });

  } catch (error) {
    console.error("Error registering user", error);
    return internalServerError({ requestId });
  }
}
