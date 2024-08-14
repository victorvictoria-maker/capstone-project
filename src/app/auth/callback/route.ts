// import { NextResponse } from "next/server";
// // The client you created from the Server-Side Auth instructions
// import { createClient } from "@/utils/supabase/server";
// import { db } from "@/lib/db";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get("next") ?? "/hospitals"; // Default redirect to hospitals

//   if (code) {
//     const supabase = createClient();
//     const { data: session, error } = await supabase.auth.exchangeCodeForSession(
//       code
//     );

//     if (!error) {
//       const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
//       const isLocalEnv = process.env.NODE_ENV === "development";
//       if (isLocalEnv) {
//         // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//         return NextResponse.redirect(`${origin}${next}`);
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`);
//       } else {
//         return NextResponse.redirect(`${origin}${next}`);
//       }
//     }
//   }

//   // return the user to an error page with instructions
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  const next = searchParams.get("next") ?? "/hospitals"; // Default redirect to hospitals

  if (code) {
    const supabase = createClient();

    try {
      const { data: session, error } =
        await supabase.auth.exchangeCodeForSession(code);

      if (error || !session?.user) {
        throw new Error(
          error?.message || "Failed to exchange code for session."
        );
      }

      const { id, user_metadata } = session.user;
      //   console.log("Session from callback", session.session);
      //   console.log("User from callback", session.user);

      const name = user_metadata?.full_name;
      const email = user_metadata?.email;
      const image = user_metadata?.picture;

      //   check if user exits with that email
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // check if it is a first time user

        if (existingUser.createdAt) {
          return NextResponse.redirect(`${origin}${next}`);
        } else {
          return NextResponse.redirect(
            `${origin}/auth?error=There is a user with this email!`
          );
        }
      } else {
        //
        // Create a new user in db
        await db.user.create({
          data: {
            id: id,
            email: email,
            name: name,
            image,
            role: "USER",
          },
        });

        // return NextResponse.redirect(`${origin}/auth?success=AccountCreated`);
        // Redirect to the desired page after successful login
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch (err) {
      console.error("OAuth Callback Error:", err);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
  }

  // Return the user to an error page if the code is missing
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
