import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });
    return { user };
  } catch (err) {
    console.error("Error creating user:", err);
    return { err };
  }
}

export async function getUserById({
  id,
  clerkUserId,
}: {
  id?: string;
  clerkUserId?: string;
}) {
  try {
    if (!id && !clerkUserId) {
      throw new Error("No id or clerkUserId provided");
    }

    const query = id ? { id } : { clerkUserId, email: "" };

    const user = await prisma.user.findUnique({
      where: query,
    });

    return { user };
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return { err };
  }
}

export async function updateUser({
  id,
  data,
}: {
  id: string;
  data: Partial<User>;
}) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return { user };
  } catch (err) {
    console.error("Error updating user:", err);
    return { err };
  }
}
