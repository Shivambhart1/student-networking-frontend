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
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import UserCard from "./UserCard";
import { useUser } from "@clerk/nextjs";

const InterestedPeople = () => {
  const [interest, setInterest] = useState("");
  const [users, setUsers] = useState<
    { id: string; fullName: string; email: string; imageUrl: string }[]
  >([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const { user } = useUser();

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
      <HeroSection className="w-full">
        <h1>Find the people with similar interests</h1>
        <div className="flex flex-col gap-4 font-FiraSans">
          <div className="flex gap-4">
            <select
              className="border p-2 px-10 rounded-md font-jetbrains bg-gray-300"
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="">Select an interest</option>
              {interests.map((interest, i) => (
                <option value={interest} key={i} className="p-4">
                  {interest}
                </option>
              ))}
            </select>

            <button
              onClick={handleFindPeople}
              className="border px-8 text-white font-bold bg-black rounded-lg ease-in-out"
            >
              {"Find".toUpperCase()}
            </button>
          </div>

          {responseMessage && <p>{responseMessage}</p>}
        </div>
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
              <div className="gap-4 p-4 rounded-md w-full grid grid-flow-col max-[600px]:grid-flow-row">
                {users.map((user, i) => (
                  <div key={i} className="w-full">
                    <UserCard
                      imageUrl={user.imageUrl}
                      fullName={user.fullName}
                    />
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </HeroSection>
    </>
  );
};

export default InterestedPeople;
