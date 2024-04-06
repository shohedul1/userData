import { connect } from "@/utils/config/dbConfig";
import userdata from "@/utils/models/userdata";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, age, address, work } = await request.json();

    // Check if user already exists
    const existingUser = await userdata.findOne({ name, age, address, work });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new userdata({
      name,
      age,
      address,
      work
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch all users from the database
    const users = await userdata.find();

    return NextResponse.json({
      users,
      success: true
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
