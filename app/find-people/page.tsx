"use client";

import React, { useState } from "react";
import InterestedPeople from "../components/InterestedPeople";
import { Input } from "@nextui-org/react";

const Page = () => {
  const [peopleName, SetPeopleName] = useState("");
  const handleSearchPeople = async (e: any) => {
    SetPeopleName(e.target.value);
    console.log(peopleName);

    const res = await fetch("/api/findUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        peopleName: peopleName,
      }),
    });
  };
  return (
    <div className="p-4 flex flex-col items-center ">
      <div className="flex items-center justify-center w-full">
        <Input
          type="text"
          value={peopleName}
          onChange={handleSearchPeople}
          label="Search Users"
        />
        <button className="relative right-20 border bg-black text-white font-jetbrains border-gray-400 px-3 rounded-md h-min">
          Find
        </button>
      </div>
      <InterestedPeople />
    </div>
  );
};

export default Page;
