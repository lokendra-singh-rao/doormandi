// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/database';
import {User} from '@/models/user.model';
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: 'Error fetching users' });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email } = await request.json();
    const newUser = await User.create({ name, email });
    return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: 'Error creating user' });
  }
}
