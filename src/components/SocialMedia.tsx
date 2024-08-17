import { Button } from "./ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { loginWithOAuth } from "@/serveractions/login";

const SocialMedia = () => {
  const signProvider = async (provider: "google" | "github") => {
    const { error, url } = await loginWithOAuth(provider);

    if (error) {
      console.error("Error signing in with provider:", error);
      return;
    }

    if (url) {
      window.location.href = url; // Handle redirect on the client side.
    }
  };

  return (
    <div className='flex items-center w-full gap-x-2 mt-4'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => signProvider("google")}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => signProvider("github")}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
};

export default SocialMedia;
