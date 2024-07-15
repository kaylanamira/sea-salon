import { User } from "@/app/models/User";
import connectToDb from '@/lib/connectToDb';
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      connectToDb()
      const { fullname, phone, email, password } = await req.json();

      if (password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({ fullname, phone, email, password: hashedPassword });

      return NextResponse.json(newUser);
      
    } catch (error) {
      console.log(error)
      return NextResponse.error();
    }
  }