import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

const HospitalPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // console.log(data.user);

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <LogoutButton />
    </div>
  );
};

export default HospitalPage;
