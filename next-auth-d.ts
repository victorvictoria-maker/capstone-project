import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role: UserRole;
      isOAuth: boolean;
      //   isTwoFactorEnabled: boolean;
    };
  }
}
