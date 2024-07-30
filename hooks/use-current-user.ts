import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    loading: status === "loading",
    authenticated: status === "authenticated",
    error: status === "unauthenticated",
  };
};
