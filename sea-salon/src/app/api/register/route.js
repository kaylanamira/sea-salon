import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST(req,res) {
    try {
        const body = await req.json();
        mongoose.connect(process.env.MONGO_URL)
        const createdUser = await User.create(body)

        // const {fullname, phone, email, password } = body;
        return Response.json(createdUser)
        
    } catch (error) {
      console.log(error)
    }
  }