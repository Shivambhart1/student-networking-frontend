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
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div>
      <Navbar isBordered>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <UserButton />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
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
      </Navbar>
      <HeroSection className="mt-20">
        <FeedComponent />
      </HeroSection>
    </div>
  );
}
