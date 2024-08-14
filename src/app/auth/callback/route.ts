// import { NextResponse } from "next/server";
// import { createClient } from "@/utils/supabase/server";
// import { db } from "@/lib/db";

import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   console.log("Auth callback route accessed");

//   const { searchParams } = new URL(request.url);
//   const code = searchParams.get("code");

//   const next = searchParams.get("next") ?? "/hospitals"; // Default redirect to hospitals

//   if (code) {
//     const supabase = createClient();

//     try {
//       const { data: session, error } =
//         await supabase.auth.exchangeCodeForSession(code);

//       if (error || !session?.user) {
//         throw new Error(
//           error?.message || "Failed to exchange code for session."
//         );
//       }

//       const { id, user_metadata } = session.user;
//       //   console.log("Session from callback", session.session);
//       //   console.log("User from callback", session.user);

//       const name = user_metadata?.full_name;
//       const email = user_metadata?.email;
//       const image = user_metadata?.picture;

//       //   check if user exits with that email
//       const existingUser = await db.user.findUnique({
//         where: { email },
//       });

//       if (existingUser) {
//         // check if it is a first time user

//         if (existingUser.createdAt) {
//           return NextResponse.redirect(
//             `${process.env.NEXT_PUBLIC_APP_URL}${next}`
//           );
//         } else {
//           return NextResponse.redirect(
//             `${process.env.NEXT_PUBLIC_APP_URL}/auth?error=There is a user with this email!`
//           );
//         }
//       } else {
//         //
//         // Create a new user in db
//         await db.user.create({
//           data: {
//             id: id,
//             email: email,
//             name: name,
//             image,
//             role: "USER",
//           },
//         });

//         // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?success=AccountCreated`);
//         // Redirect to the desired page after successful login
//         console.log("Auth callback sucessffuyl login");
//         return NextResponse.redirect(
//           `${process.env.NEXT_PUBLIC_APP_URL}${next}`
//         );
//       }
//     } catch (err) {
//       console.error("OAuth Callback Error:", err);
//       return NextResponse.redirect(
//         `${process.env.NEXT_PUBLIC_APP_URL}/auth/auth-code-error`
//       );
//     }
//   }

//   // Return the user to an error page if the code is missing
//   return NextResponse.redirect(
//     `${process.env.NEXT_PUBLIC_APP_URL}/auth/auth-code-error`
//   );
// }

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const next = requestUrl.searchParams.get("next") ?? "/hospitals"; // Default redirect to hospitals

  if (code) {
    const supabase = createClient();
    // await supabase.auth.exchangeCodeForSession(code);

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
          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}${next}`
          );
        } else {
          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/auth?error=There is a user with this email!`
          );
        }
      } else {
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
        // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?success=AccountCreated`);
        // Redirect to the desired page after successful login
        console.log("Auth callback sucessffuyl login");
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_APP_URL}${next}`
        );
      }
    } catch (err) {
      console.error("OAuth Callback Error:", err);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/auth-code-error`
      );
    }
  }

  // return NextResponse.redirect(requestUrl.origin);

  // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${next}`);
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/auth/auth-code-error`
  );
}
