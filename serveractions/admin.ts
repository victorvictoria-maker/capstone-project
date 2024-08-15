"use server";

import { db } from "@/lib/db";
import { Hospital } from "../types";

export async function deleteHospitalById(hospitalId: number) {
  try {
    await db.healthcareProvider.delete({
      where: { id: hospitalId },
    });
    return { success: "Record deleted successffuly!" };
  } catch (error) {
    console.error("Error deleting hospital:", error);
    return { error: "Error deleting record!" };
  }
}

export async function fetchDropdownOptionsForHospitalEdit() {
  const states = await db.healthcareProviderState.findMany({
    select: { id: true, name: true },
  });
  const types = await db.healthcareProviderType.findMany({
    select: { id: true, name: true },
  });
  const tiers = await db.healthcareProviderTier.findMany({
    select: { id: true, name: true },
  });

  return { states, types, tiers };
}

export async function updateHospital(updatedHospital: Hospital) {
  //    const { id, name, address, phone_number, stateId, typeId, tierId } = updatedHospital;
  console.log(updatedHospital);

  //   let finalTypeId = typeId;

  // new hospital type creation
  //   if (typeId === "new") {
  //     const newType = updatedHospital.type?.name;
  //     if (newType) {
  //       const existingType = await db.healthcareProviderType.findUnique({
  //         where: { name: newType },
  //       });
  //       if (!existingType) {
  //         const createdType = await db.healthcareProviderType.create({
  //           data: { name: newType },
  //         });
  //         finalTypeId = createdType.id;
  //       }
  //     }
  //   }

  try {
    // const updated = await db.healthcareProvider.update({
    //   where: { id },
    //   data: {
    //     name,
    //     address,
    //     phone_number,
    //     stateId,
    //     typeId: finalTypeId,
    //     tierId,
    //   },
    // });
    // data: updated
    return { success: "Hospital updated successfully!" };
  } catch (error) {
    console.error("Error updating hospital:", error);
    return { error: "An error occurred while updating the hospital." };
  }
}

export const createHospital = async (hospital: Hospital) => {
  try {
    // const newHospital = await db.healthcareProvider.create({
    //   data: hospital,
    // });

    // hospital: newHospital
    console.log(hospital);
    return { success: "Hospital created successfully!" };
  } catch (error) {
    console.error("Error creating hospital:", error);
    return { error: "Failed to create hospital" };
  }
};
