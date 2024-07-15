import { User } from "@/app/models/User";
import connectToDb from '@/lib/connectToDb';
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        connectToDb()
        const { email } = await req.json();
        const user = await User.findOne({email}).select("_id")
        console.log("user: ", user)
        return NextResponse.json({user})
    } catch (error) {
      console.log(error)
    }
  }