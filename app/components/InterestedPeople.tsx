"use client";

import React, { useState } from "react";
import { interests } from "../values";
import { HeroSection } from "../styledComponents";

const InterestedPeople = () => {
  const [interest, setInterest] = useState("");
  const [users, setUsers] = useState<
    { id: string; fullName: string; email: string }[]
  >([]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleFindPeople = async () => {
    console.log("Finding people with similar interests:", interest);
    const res = await fetch("/api/getUsersByInterest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interest: interest,
      }),
    });
    const data = await res.json();
    console.log("API response:", data);
    if (data.success) {
      setUsers(data.users);
    } else {
      setResponseMessage(`Error: ${data.error}`);
    }
  };

  return (
    <>
      <HeroSection>
        <div className="flex flex-col gap-4 font-jetbrains">
          <h1>Find the people with similar interests</h1>
          <select
            className="border p-2 px-10 bg-gray-300"
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">Select an interest</option>
            {interests.map((interest, i) => (
              <option value={interest} key={i}>
                {interest}
              </option>
            ))}
          </select>
          <button
            onClick={handleFindPeople}
            className="border p-2 text-white font-bold bg-black ease-in-out"
          >
            {"Find".toUpperCase()}
          </button>
          {responseMessage && <p>{responseMessage}</p>}
          {users.length > 0 && (
            <>
              <h2>People with similar interests</h2>
              <div className="flex flex-col gap-4 border p-4 bg-gray-200 rounded-md">
                {users.map((user, i) => (
                  <div key={i} className="flex gap-4">
                    <p>{user.fullName.toUpperCase()} - </p>
                    <p>{user.email}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </HeroSection>
    </>
  );
};

export default InterestedPeople;
