"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { interests } from "../values";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.id;
  const [interest, setInterest] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const popupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const updateUserMetadata = async () => {
    if (!interest) {
      setResponseMessage("Please select an interest.");
      setShowPopup(true);
      return;
    }

    setIsLoading(true);
    const res = await fetch("/api/updateUserMetadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    setIsLoading(false);

    // Show the popup and hide it after a delay
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      // router.push("/");
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar isBordered>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem
            className="font-Inconsolata cursor-pointer p-2"
            onClick={() => router.push("/")}
          >
            {" "}
            &larr; Back
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {user?.id && <p>Logged in as {user.fullName}</p>}
          </NavbarItem>
          <NavbarItem></NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="mt-6">
        <select
          className="w-full font-Inconsolata"
          onChange={(e) => setInterest(e.target.value)}
        >
          {interests.map((interest, index) => (
            <option key={index} value={interest}>
              {interest}
            </option>
          ))}
        </select>
        <button
          onClick={updateUserMetadata}
          className="w-full rounded-md border border-gray-400 py-2 bg-purple-600 text-white mt-4 text-xl"
        >
          Submit / Update
        </button>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        showPopup && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={popupVariants}
            transition={{ duration: 0.3 }}
            className="left-1/2 transform -translate-x-1/2 px-4 shadow-lg rounded-full py-1.5 bg-black text-white mt-4"
          >
            {responseMessage}
          </motion.div>
        )
      )}
    </div>
  );
};

export default UserProfile;
