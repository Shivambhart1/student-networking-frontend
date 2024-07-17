import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { interest } = body;
    console.log("Interest received:", interest);

    // Fetch user list from Clerk
    const response = await clerkClient.users.getUserList();
    const users = response.data; // Adjust based on actual structure
    console.log("Users received:", users);

    // Filter users based on interest
    const filteredUsers = users.filter((user) => {
      const userInterest = user.publicMetadata?.interest;
      console.log(`User: ${user.fullName}, Interest:`, userInterest);

      // Case-insensitive comparison (adjust as needed)
      return userInterest && userInterest === interest.toLowerCase();
    });

    const userNames = filteredUsers.map((user) => ({
      id: user.id,
      username: user.username,
      fullName: `${user.fullName}`,
      email: user.emailAddresses[0]?.emailAddress,
      imageUrl: user.imageUrl,
    }));

    console.log("Filtered users:", userNames);

    return NextResponse.json({ success: true, users: userNames });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ success: false, error: (error as any).message });
  }
}
