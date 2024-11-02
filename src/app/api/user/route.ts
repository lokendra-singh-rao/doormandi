// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/app/lib/database';
import {User} from '@/models/user.model';
export async function GET() {
  try {
    await connectToMongoDB();
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: 'Error fetching users' });
  }
}

export async function POST(request: Request) {
  try {
    console.log("Inside post")
    await connectToMongoDB();
    const { fullname, phone, email, password } = await request.json();
    console.log(fullname, phone, email, password)
    const user = new User({ fullname, phone, email, hash:"211221", role:"USER" });
    const newUser = await User.create(user);
    console.log(newUser)
    return NextResponse.json({ success: true, data: newUser });
  } catch (error : any) {
    console.log(Object.keys(error.errors).map(err => {
      console.log(error.errors[err].properties.message)
    }))
    return NextResponse.json({ success: false, error: 'Error creating user' });
  }
}
