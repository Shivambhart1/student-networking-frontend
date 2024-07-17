import { useUser } from "@clerk/nextjs";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NextUIProvider,
} from "@nextui-org/react";

export const DropdownContent = ({ variant, color }: any) => {
  const { user } = useUser();
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        {user ? (
          <p className="font-jetbrains">WELCOME: {user.fullName}</p>
        ) : (
          <Button color={color} variant={variant} className="capitalize">
            Authorise
          </Button>
        )}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        color={color}
        variant={variant}
      >
        <DropdownItem href="/sign-up">Sign up</DropdownItem>
        <DropdownItem href="/sign-in">Sign in</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
