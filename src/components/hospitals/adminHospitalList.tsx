"use client";

import { useState, startTransition, useEffect } from "react";
import { DropDownOptions, Hospital } from "../../../types";
import Hospitallist from "./hospitallist";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import {
  deleteHospitalById,
  fetchDropdownOptionsForHospitalEdit,
  updateHospital,
} from "../../../serveractions/admin";
import EditPopover from "./editPopover";

const AdminHospitalList = ({
  allHospitals,
  adminEmail,
}: {
  allHospitals: Hospital[];
  adminEmail: string;
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>(allHospitals);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [dropdownOptions, setDropdownOptions] = useState<DropDownOptions>({
    states: [],
    types: [],
    tiers: [],
  });

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
    if (result.success) {
      setSelectedHospital(null);
      setHospitals((prevHospitals) =>
        prevHospitals.map((h) =>
          h.id === updatedHospital.id ? updatedHospital : h
        )
      );
      setSuccess("Hospital updated successfully!");
    } else {
      setError(result.error || "Failed to update hospital");
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
            setError(data.error);
          }

          if (data?.success) {
            setSuccess(data.success);

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
          setError("Something went wrong while deleting the hospital!");
        });
    });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {/* comvert this to 5 seconds toast */}
      <FormError message={error} />
      <FormSuccess message={success} />
      {selectedHospital && (
        <EditPopover
          hospital={selectedHospital}
          onSave={saveHospital}
          onClose={closeModal}
          options={dropdownOptions}
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
