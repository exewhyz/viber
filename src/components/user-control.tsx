"use client";

import { useCurrentTheme } from "@/hooks/use-current-theme";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

interface Props {
  showName?: boolean;
}

const UserControl = ({ showName }: Props) => {
  const currentTheme = useCurrentTheme();
  return (
    <UserButton
      showName={showName}
      appearance={{
        elements: {
          userButtonBox: "rounded-md!",
          userButtonTrigger: "rounded-md!",
          userButtonAvatarBox: "rounded-md! size-8!",
        },
        baseTheme: currentTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default UserControl;
