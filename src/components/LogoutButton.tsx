"use client";

import { Button } from "@/components/ui/button";
import { logout } from "../serveractions/logout";

export const LogoutButton = () => {
  const logoutUser = () => {
    logout();
  };

  return (
    <Button onClick={logoutUser} variant='outline'>
      Logout
    </Button>
  );
};
