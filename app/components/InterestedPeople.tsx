"use client";

import React, { useState } from "react";
import { interests } from "../values";
import { HeroSection } from "../styledComponents";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  Progress,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import Image from "next/image";

const InterestedPeople = () => {
  const [interest, setInterest] = useState("");
  const [users, setUsers] = useState<
    { id: string; fullName: string; email: string; imageUrl: string }[]
  >([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  const handleFindPeople = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } else {
      setResponseMessage(`Error: ${data.error}`);
    }
  };

  return (
    <>
      <HeroSection>
        <h1>Find the people with similar interests</h1>
        <div className="flex flex-col gap-4 font-FiraSans">
          <div className="flex gap-4">
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
              className="border p-2 text-white font-bold bg-black rounded-lg ease-in-out"
            >
              {"Find".toUpperCase()}
            </button>
          </div>

          {responseMessage && <p>{responseMessage}</p>}
          {isLoading ? (
            <div className="flex justify-center">
              <Progress
                aria-label="Loading..."
                isIndeterminate
                size="sm"
                className="max-w-md"
              />
            </div>
          ) : (
            users.length > 0 && (
              <>
                <div className="gap-4 border p-4 rounded-md overflow-x-auto">
                  {users.map((user, i) => (
                    <div key={i} className="flex gap-4">
                      {/* <img src={user.imageUrl} alt="" /> */}
                      <div className="grid place-content-center">
                        <Avatar
                          src={user.imageUrl}
                          className="flex shrink-0"
                          size="sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-large flex flex-1">
                          {user.fullName}
                        </p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </HeroSection>
    </>
  );
};

export default InterestedPeople;
