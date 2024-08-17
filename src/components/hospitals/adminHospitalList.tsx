"use client";

import { useState, startTransition, useEffect } from "react";
import { DropDownOptions, Hospital } from "../../../types";
import Hospitallist from "./hospitallist";
import { toast } from "react-toastify";
import EditPopover from "./edithospitalform";
import {
  deleteHospitalById,
  fetchDropdownOptionsForHospitalEdit,
  updateHospital,
} from "@/serveractions/admin";

const AdminHospitalList = ({
  allHospitals,
  adminEmail,
}: {
  allHospitals: Hospital[];
  adminEmail: string;
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>(allHospitals);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [dropdownOptions, setDropdownOptions] = useState<DropDownOptions>({
    states: [],
    types: [],
    tiers: [],
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const loadDropdownOptions = async () => {
      const options = await fetchDropdownOptionsForHospitalEdit();
      setDropdownOptions(options);
    };

    loadDropdownOptions();
  }, []);

  const editHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
  };

  const saveHospital = async (updatedHospital: Hospital) => {
    const result = await updateHospital(updatedHospital);
    if (result?.success) {
      setSelectedHospital(null);
      setHospitals((prevHospitals) =>
        prevHospitals.map((h) =>
          h.id === updatedHospital.id ? updatedHospital : h
        )
      );
      toast.success("Hospital updated successfully!");
    } else if (result?.error) {
      toast.error(result.error || "Failed to update hospital");
    }
  };

  const closeModal = () => {
    setSelectedHospital(null);
  };

  const deleteHospital = (hospitalId: number) => {
    startTransition(() => {
      setIsLoading(true);
      deleteHospitalById(hospitalId)
        .then((data) => {
          setIsLoading(false);
          if (data?.error) {
            toast.error(data.error);
          }

          if (data?.success) {
            toast.success(data.success);

            if (data.success === "Record deleted successffuly!") {
              // update ui
              const updatedHospitals = hospitals.filter(
                (hospital) => hospital.id !== hospitalId
              );
              setHospitals(updatedHospitals);
            }
          }
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("Something went wrong while deleting the hospital!");
        });
    });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {selectedHospital && (
        <EditPopover
          hospital={selectedHospital}
          onClose={closeModal}
          onHospitalUpdated={saveHospital}
          dropdownOptions={dropdownOptions}
        />
      )}

      <Hospitallist
        allHospitals={hospitals}
        userEmail={adminEmail}
        isAdmin={true}
        onEditHospital={editHospital}
        onDeleteHospital={deleteHospital}
      />
    </div>
  );
};

export default AdminHospitalList;
