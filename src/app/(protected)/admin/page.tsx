import { LogoutButton } from "@/components/LogoutButton";
import Welcome from "@/markdown/welcome.mdx";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import AdminHospitalList from "@/components/hospitals/adminHospitalList";
import { fetchHospitalData } from "../../../../serveractions/hospitals";

import { Hospital, Tier, Type } from "../../../../types";

const AdminPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  // console.log(data);

  const allHospitals = await fetchHospitalData();

  if (error || !data?.user) {
    redirect("/login");
  }

  const adminEmail = data.user?.email ?? "";

  const handleCreateHospital = (
    newHospital: Omit<Hospital, "id" | "createdAt" | "updatedAt">
  ) => {
    console.log("New Hospital Created:", newHospital);
    // You can handle the new hospital creation here, e.g., send to an API or update state
  };

  return (
    <div>
      <p>AdminPage</p>
      <AdminHospitalList allHospitals={allHospitals} adminEmail={adminEmail} />
      <Welcome />
      <LogoutButton />
    </div>
  );
};

export default AdminPage;
