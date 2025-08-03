import { NextResponse } from "next/server";
import axiosInstance from "@/configs/axiosInstance";

export async function POST(request) {
  // const reqObject = await request.json();

  try {
    return NextResponse.json({
      success: true,
      user: {
        id: 1,
        name: "John Doe",
        email: "5FtK5@example.com",
        phone: "+8801234567890",
        image: "https://thispersondoesnotexist.com/",
        uuid: "12345678-1234-1234-1234-123456789012",
        passChangePending: false,
        roles: ["admin", "user"],
      },
    });
  } catch (error) {
    console.log("\n\nError in signin API route: " + error);
    return NextResponse.json(error.response.data.error);
  }
}
