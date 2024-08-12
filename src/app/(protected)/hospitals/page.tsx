import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";
import { fetchHospitalData } from "../../../../serveractions/hospitals";
import Hospitallist from "@/components/hospitals/hospitallist";

const HospitalPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // console.log(data.user);
  const allHospitals = await fetchHospitalData();

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <p className='text-4xl text-purple-700'>Ini is a baby.</p>
      <div className='hospitals-container p-6 bg-gray-100 rounded-lg shadow-md'>
        <Hospitallist allHospitals={allHospitals} />
      </div>

      <LogoutButton />
    </div>
  );
};

export default HospitalPage;
