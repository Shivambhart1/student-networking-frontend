import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const { stripeId, userId } = await new Response(request.body).json();

  const user = await clerkClient.users.getUser(userId);
  return NextResponse.json(user.privateMetadata);
}
