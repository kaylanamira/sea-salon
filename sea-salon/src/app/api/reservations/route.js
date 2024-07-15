import { Reservation } from "@/app/models/Reservation";
import connectToDb from '@/lib/connectToDb';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connectToDb();
    // const {userId, branchId, services, datetime} = await req.json();
    const {userId, branchId, services, date, time} = await req.json();

    // const [date, time] = datetime.split('T');
    // const [hour, minute] = time.split(':');
    // const parsed = parseInt(time.hour, 10)
    // if (parsed < 9 || parsed > 21){
    //   return NextResponse.json({ error: "Reservation must be in operating hours" }, { status: 500 });
    // }

    // const newReservation = await Reservation.create({userId, branchId, services, date, time:{ hour, minute }})
    const newReservation = await Reservation.create({userId, branchId, services, date, time})
    return NextResponse.json(newReservation)
  } catch (error) {
    console.log(error)
    return NextResponse.error();
  }
}

export async function GET(req) {
  try {
    connectToDb();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const limit = parseInt(url.searchParams.get("limit"), 4) || 0;
    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const reservations = await Reservation.find(query)
      .populate('userId')
      .populate('branchId')
      .populate({
        path: 'services',
        model: 'Service'
      }).limit(limit);
    return NextResponse.json(reservations);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching reservations" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    connectToDb();
    const {_id} = await req.json();
    await Reservation.findByIdAndDelete(_id);
    return NextResponse.json(_id);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting reservations" }, { status: 500 });
  }
}