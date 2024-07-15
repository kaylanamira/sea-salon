import { Review } from "@/app/models/Review";
import connectToDb from '@/lib/connectToDb';
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connectToDb();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const limit = parseInt(url.searchParams.get("limit"), 5) || 5;

    const query = userId ? { userId } : {};
    const reviews = await Review.find(query).limit(limit);

    return NextResponse.json(reviews);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching reviews" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
      connectToDb();
      const body = await req.json();
      const newReview = await Review.create(body)
      return NextResponse.json(newReview)
  } catch (error) {
    console.log(error)
    return NextResponse.error();
  }
}