import { Branch } from "@/app/models/Branch";
import { Service } from "@/app/models/Service";
import connectToDb from '@/lib/connectToDb';
import { NextResponse } from "next/server";

export async function POST(req) {
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    return { hour, minute };
  };

  try {
    connectToDb();
    const { name, location, openTime, closeTime, services } = await req.json(); 
    
    for (const service of services) {
      let existingService = await Service.findOne({ name: service.name, duration: service.duration });
      if (!existingService) {
        existingService = await Service.create(service);
      }
    }
    
    const newBranch = await Branch.create({
      name,
      location,
      openTime: formatTime(openTime),
      closeTime: formatTime(closeTime),
      services: services
    });
    return NextResponse.json(newBranch);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function GET() {
  try {
    connectToDb();
    const branch = await Branch.find().populate('services');
    return NextResponse.json(branch);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching branches" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    connectToDb();
    const {_id, services} = await req.json();
    if (!_id || !services) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    for (const service of services) {
      let existingService = await Service.findOne({ name: service.name, duration: service.duration });
      if (!existingService) {
        existingService = new Service(service);
        await existingService.save();
      }
    }
    await Branch.findByIdAndUpdate(_id, {services: services});
    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error updating branch" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    connectToDb();
    const {_id} = await req.json();
    await Branch.findByIdAndDelete(_id);
    return NextResponse.json(_id);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting branch" }, { status: 500 });
  }
}