import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import AdminHospitalList from "@/components/hospitals/adminHospitalList";
import { fetchHospitalData } from "../../../../serveractions/hospitals";
import CreateHospitalForm from "@/components/hospitals/adminCreateHospitalForm";

import HospitalNav from "@/components/hospitals/hospitalNav";
import HospitalListFooter from "@/components/hospitals/hospitallistfooter";

export const metadata = {
  title: "Admin Page",
};

const AdminPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  // console.log(data);

  const allHospitals = await fetchHospitalData();

  if (error || !data?.user) {
    redirect("/login");
  }

  const email = data.user?.email ?? "";
  const profilePicture = data.user.user_metadata.avatar_url as string;

  return (
    <div>
      <HospitalNav profilePicture={profilePicture} email={email} />

      <AdminHospitalList allHospitals={allHospitals} adminEmail={email} />
      <HospitalListFooter />
    </div>
  );
};

export default AdminPage;
