"use client";

import { NavContainer, HeroSection } from "./styledComponents";
import { PlaceholdersAndVanishInputDemo } from "./components/ui/PlaceholderAndVanishInputDemo";
import FeedComponent from "./components/ui/FeedComponent";
import { UserButton, UserProfile } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <NavContainer>
        <UserButton />
        <PlaceholdersAndVanishInputDemo />
        <div className="flex gap-4">
          <a href="/sign-up">Sign up</a>
          <a href="/sign-in"> Sign In</a>
        </div>
      </NavContainer>
      <HeroSection className="mt-20">
        <FeedComponent />
      </HeroSection>
    </>
  );
}
