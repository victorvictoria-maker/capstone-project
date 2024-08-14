import Hospitallist from "@/components/hospitals/hospitallist";
import { LogoutButton } from "@/components/LogoutButton";
import Welcome from "@/markdown/welcome.mdx";
import { fetchHospitalData } from "../../../../serveractions/hospitals";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const allHospitals = await fetchHospitalData();

  return (
    <div>
      <p>AdminPage</p>
      {/* <Hospitallist
        allHospitals={allHospitals}
        userEmail='victorvictoria0001'
      /> */}

      <Welcome />
      <LogoutButton />
    </div>
  );
};

export default AdminPage;
