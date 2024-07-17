"use client";

import { PlaceholdersAndVanishInputDemo } from "./components/ui/PlaceholderAndVanishInputDemo";
import FeedComponent from "./components/ui/FeedComponent";
import { UserButton, UserProfile, useUser } from "@clerk/nextjs";
import { HeroSection } from "./styledComponents";
import { DropdownContent } from "./components/ui/DropdownContent";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Home() {
  const { user } = useUser();
  return (
    <>
      <Navbar isBordered>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <UserButton />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex"></NavbarItem> */}
          <NavbarItem>
            <DropdownContent variant="bordered" color="black" />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <HeroSection className="mt-20">
        <FeedComponent />
      </HeroSection>
    </>
  );
}
