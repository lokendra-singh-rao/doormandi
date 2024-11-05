// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { internalServerError, success } from "@/types/ApiResponse";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Error fetching users" });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const requestId = randomUUID();
  try {
    const { fullname, phone, email, password } = await request.json();
    const hash = password;
    const user = new User({ fullname, phone, email, hash, role: "USER" });
    const newUser = await User.create(user);
    // console.log(newUser);
   
    return success({data: newUser, requestId, message: "User registered successfully"});
  } catch (error) {
    console.log("Error registering user", error);
    return internalServerError({requestId});
  }
}
