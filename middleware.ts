// import authConfig from "./auth.config";
// import NextAuth from "next-auth";
// import {
//   apiAuthPrefix,
//   authRoutes,
//   DEFAULT_LOGIN_REDIRECT,
//   publicRoutes,
// } from "./routes";
// import { NextRequest } from "next/server";

// const { auth } = NextAuth(authConfig);
// export default auth((req): any => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return null;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }

//     return null;
//   }

//   if (!isLoggedIn && !isPublicRoute) {

//     let callbackUrl = nextUrl.pathname;
//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     return Response.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//     );
//   }

//   return null;
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// middleware.ts
// import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(req: any) {
  const { nextUrl } = req;
  const session = await auth(req);

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/login", "/register"].includes(nextUrl.pathname);
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/hospitals", nextUrl));
  }

  if (!session && !isPublicRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
