import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { userId, metadata } = body;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: metadata,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as any).message });
  }
}
