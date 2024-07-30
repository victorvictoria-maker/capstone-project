// "use client";

import { useEffect } from "react";
import { useCurrentUser } from "../../../../hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { logout } from "../../../../serveractions/logout";
// import { signOut } from "next-auth/react";
import { auth, signOut } from "../../../../auth";

const HospitalsPage = async () => {
  // const { user } = useCurrentUser();

  // useEffect(() => {
  //   if (!loading && authenticated) {
  //     console.log(user);
  //   }
  // }, [loading, authenticated, user]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error loading user data</p>;
  // }

  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <p>HospitalsPage</p>
      <p>{session.user.name}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type='submit'>Logout</Button>
      </form>
      {/* <Button onClick={() => signOut()}>Logout</Button> */}
    </div>
  );
};

export default HospitalsPage;
