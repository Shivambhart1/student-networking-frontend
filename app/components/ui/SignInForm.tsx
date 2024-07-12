"use client";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/utils/cn";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignInFormDemo() {
  const HandleSubmit = async (e: any) => {
    e.preventDefault();

    const backend_PORT = 5000;

    // try {
    //   const res = await axios.post(
    //     `http://localhost:${backend_PORT}/api/signup/`,
    //     {
    //       username: formData.username,
    //       email: formData.email,
    //       password: formData.password,
    //     }
    //   );
    //   toast(res.data.message, {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // } catch (error) {
    //   toast((error as any).response.data.message, {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   console.log(error);
    // }
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to ACHARYA
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to project_name if you can because we don&apos;t have a login flow
        yet
      </p>
      <form className="my-8" onSubmit={HandleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Acharya Email Address</Label>
          <Input
            id="email"
            placeholder="@acharya.ac.in"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4"></div>
      </form>
      <div className="text-center">
        {" "}
        <h2 className="text-center">Don't have an account?</h2>
        <a href="/signup" className="text-blue-700 hover:underline">
          Sign Up
        </a>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
