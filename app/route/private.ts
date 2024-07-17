import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { stripeId, userId } = body;

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        stripeId: stripeId,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as any).message });
  }
}
