// serveractions/hospitals.ts

import {
  getAllFilteredHealthcareProvider,
  getAllHealthcareProvider,
} from "../fetchdatafromdb/gethospitals";
import { Hospital } from "../types";

export async function fetchHospitalData(): Promise<Hospital[]> {
  try {
    const hospitals = await getAllHealthcareProvider();
    if (hospitals) {
      return hospitals || [];
    } else {
      console.log("No hospital found");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch paginated hospital data for "Load More" functionality
export async function fetchFilteredHealthcareProvider(
  page: number,
  limit: number
): Promise<Hospital[]> {
  //string
  try {
    const hospitals = await getAllFilteredHealthcareProvider(page, limit);
    if (hospitals) {
      return hospitals || [];
      // return "hello vicky";
    } else {
      console.log("No more hospitals found");
      return [];
      // return "error";
    }
  } catch (error) {
    console.log(error);
    return [];
    // return "error";
  }
}
