"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserProfile = () => {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.id;
  const [interest, setInterest] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const updateUserMetadata = async () => {
    const res = await fetch("/api/updateUserMetadata", {
      method: "POST",
      headers: {
        "Content-Type": "appication/json",
      },
      body: JSON.stringify({
        userId: userId,
        metadata: {
          interest: interest.toLowerCase(),
        },
      }),
    });
    const data = await res.json();
    setResponseMessage(
      data.success ? "Interests updated" : "Error updating interests"
    );
    router.push("/");
  };

  return (
    <>
      <div>Update your interests</div>
      {user?.id && (
        <p>
          Logged in as {user.fullName} <br /> {user.id}
        </p>
      )}
      <input
        type="text"
        placeholder="Interests"
        className="border p-2"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />
      <button
        onClick={updateUserMetadata}
        className="border bg-black text-white p-2 rounded-md"
      >
        Update
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </>
  );
};

export default UserProfile;
