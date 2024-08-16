"use server";

import { db } from "@/lib/db";
import { CreateHospitalInput, Hospital } from "../types";

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
  try {
    const { id, name, address, phone_number, stateId, tierId, typeId } =
      updatedHospital;

    const updated = await db.healthcareProvider.update({
      where: { id },
      data: {
        name,
        address,
        phone_number,
        state: {
          connect: { id: stateId },
        },
        tier: {
          connect: { id: tierId },
        },
        type: {
          connect: { id: typeId },
        },
      },
      include: {
        state: true,
        tier: true,
        type: true,
      },
    });

    return { success: "Hospital updated successfully!", hospital: updated };
  } catch (error) {
    console.error("Error updating hospital:", error);
    return { error: "An error occurred while updating the hospital." };
  }
}

export const createHospital = async (hospitalData: CreateHospitalInput) => {
  try {
    const newHospital = await db.healthcareProvider.create({
      data: hospitalData,
      include: {
        state: true,
        tier: true,
        type: true,
      },
    });

    const hospital: Hospital = {
      id: newHospital.id,
      name: newHospital.name || "",
      address: newHospital.address || "",
      phone_number: newHospital.phone_number || "",
      stateId: newHospital.stateId || 0,
      state: newHospital.state
        ? {
            id: newHospital.state.id,
            name: newHospital.state.name || "",
          }
        : { id: 0, name: "" },
      tierId: newHospital.tierId || 0,
      tier: newHospital.tier
        ? {
            id: newHospital.tier.id,
            name: newHospital.tier.name || "",
          }
        : { id: 0, name: "" },
      typeId: newHospital.typeId || 0,
      type: newHospital.type
        ? {
            id: newHospital.type.id,
            name: newHospital.type.name || "",
          }
        : { id: 0, name: "" },
      createdAt: newHospital.createdAt || new Date(),
      updatedAt: newHospital.updatedAt || new Date(),
    };

    return { success: "Hospital created successfully!", hospital };
  } catch (error) {
    console.error("Error creating hospital:", error);
    return { error: "Failed to create hospital" };
  }
};
