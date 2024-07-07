"use client";
import Image from "next/image";

import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "./components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { NavContainer, HeroSection } from "./styledComponents";
import { CardBody, CardContainer, CardItem } from "./components/ui/3d-card";
import Link from "next/link";
import fearOfGod from "../public/fearOfGod.jpg";
import { BentoGrid, BentoGridItem } from "./components/ui/bento-gris";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { PlaceholdersAndVanishInputDemo } from "./components/ui/PlaceholderAndVanishInputDemo";
import FeedComponent from "./components/FeedComponent";

export default function Home() {
  return (
    <>
      <NavContainer>
        <h1>LOGO</h1>
        <PlaceholdersAndVanishInputDemo />
        <a href="/signup">Sign up</a>
      </NavContainer>
      <HeroSection className="mt-20">
        <FeedComponent />
      </HeroSection>
    </>
  );
}
