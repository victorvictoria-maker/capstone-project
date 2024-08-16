import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";
import { fetchHospitalData } from "../../../../serveractions/hospitals";
import Hospitallist from "@/components/hospitals/hospitallist";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
import HospitalNav from "@/components/hospitals/hospitalNav";
import HospitalListFooter from "@/components/hospitals/hospitallistfooter";
{
  /* <FaRegUser /> */
}

export const metadata = {
  title: "Hospitals",
};

const HospitalPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // console.log(data.user);
  const allHospitals = await fetchHospitalData();
  const userEmail = data.user.email as string;
  const profilePicture = data.user.user_metadata.avatar_url as string;

  return (
    <div>
      <HospitalNav profilePicture={profilePicture} email={userEmail} />

      <div className='hospitals-container p-6 bg-gray-100 rounded-lg shadow-md'>
        <Hospitallist allHospitals={allHospitals} userEmail={userEmail} />
      </div>
      <HospitalListFooter />
    </div>
  );
};

export default HospitalPage;
