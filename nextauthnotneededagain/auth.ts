import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
// import authConfig from "./nextauthnotneededagain/auth.config";
// import { getUserById } from "./fetchdatafromdb/getuser";
// import { getAccountByUserId } from "./fetchdatafromdb/getuseraccount";
import { UserRole } from "@prisma/client";
import { getUserById } from "../fetchdatafromdb/getuser";
import { getAccountByUserId } from "../fetchdatafromdb/getuseraccount";
import authConfig from "./auth.config";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/register",
    error: "/error",
  },
  callbacks: {
    // a user cant sign if they have not verified their email - this is a fallback that wont allow user to login
    async signIn({ user, account }: any) {
      //  allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser) {
        return false;
      }

      // prevent sigin without verification
      //   if (!existingUser?.emailVerified) return false;

      // two factor confirmation
      //   if (existingUser.isTwoFactorEnabled) {
      //     const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //       existingUser.id
      //     );

      //     if (!twoFactorConfirmation) return false;

      //     await db.twoFactorConfirmation.delete({
      //       where: { id: twoFactorConfirmation.id },
      //     });
      //   }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      //   if (session.user) {
      //     session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      //   }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      console.log({ session });
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      // manually updating name and email so the session gets updated on modification
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.isOAuth = !!existingAccount;

      token.role = existingUser.role;
      //   token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  //   providers: [GitHub, Google],
});
