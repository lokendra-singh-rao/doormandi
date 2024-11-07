// Route - api/auth/sign-up
import dbConnect from "@/lib/dbConnect";
import { internalServerError } from "@/types/ApiResponse";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  await dbConnect();
  const requestId = randomUUID();

  try {
    console.log(request)

  } catch (error) {
    console.log("Error registering user", error);
    return internalServerError({ requestId });
  }
}
