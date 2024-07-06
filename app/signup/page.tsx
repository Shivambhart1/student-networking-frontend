import React from "react";
import { SignupFormDemo } from "../components/ui/SignUpForm";

const page = () => {
  return (
    <div className="flex justify-between">
      <section className="bg-black w-[50%] flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center">
          <h1 className="text-white font-jetbrains text-3xl font-bold">
            STUDENT - NETWORK
          </h1>
          <p className="text-white">
            Sign up to be a part of our online Acharya community.
          </p>
        </div>
      </section>
      <section className="w-[50%] flex items-center justify-center">
        <SignupFormDemo />
      </section>
    </div>
  );
};

export default page;
