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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
  const { user } = useUser();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const [peopleName, SetPeopleName] = useState("");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSearchPeople = async (e: any) => {
    SetPeopleName(e.target.value);
    console.log(peopleName);

    const res = await fetch("/api/findPeople", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interest: peopleName,
      }),
    });
  };
  return (
    <div>
      <Navbar isBordered>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <UserButton />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex"></NavbarItem>
          <NavbarItem>
            <DropdownContent variant="bordered" color="black" />
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  Connect
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                // selectedKeys={selectedKeys}
                // onSelectionChange={setSelectedKeys}
              >
                <DropdownItem key="text" href="/find-people">
                  Find People
                </DropdownItem>
                <DropdownItem key="iteration" href="/update-interests">
                  Update your Interest
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <div className="flex items-center">
          <Input
            type="text"
            value={peopleName}
            onChange={handleSearchPeople}
            label="Find People"
          />
          <button className="relative right-20 border bg-black text-white font-jetbrains border-gray-400 px-3 rounded-md h-min">
            Find
          </button>
        </div>
      </Navbar>
      <HeroSection className="mt-20">
        <FeedComponent />
      </HeroSection>
    </div>
  );
}
