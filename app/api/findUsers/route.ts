import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { error } from "console";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { peopleName } = body;
    console.log(`Name recieved: ${peopleName}`);

    const res = await clerkClient.users.getUserList();
    const users = res.data;
    console.log(`Users recieved ${users}`);

    const filteredUsers = users.filter((user) => {
      const userName = user.fullName;
      console.log(`User: ${user.fullName}`);

      return (
        userName && userName.toLowerCase().includes(peopleName.toLowerCase())
      );
    });
    const userNames = filteredUsers.map((user) => ({
      id: user.id,
      name: user.fullName,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    }));

    console.log(`Filtered users: ${userNames}`);

    return NextResponse.json({ success: true, users: userNames });
  } catch (err) {
    console.log(`Error in Sending request: ${err}`);
    return NextResponse.json({ success: false, error: (error as any).message });
  }
}
