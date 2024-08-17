import {
  getAllFilteredHealthcareProvider,
  getAllHealthcareProvider,
} from "../fetchdatafromdb/gethospitals";
import { Hospital } from "../types";

export async function fetchHospitalData(): Promise<Hospital[]> {
  try {
    const hospitals = await getAllHealthcareProvider();
    if (hospitals) {
      return (hospitals as Hospital[]) || [];
    } else {
      console.log("No hospital found");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch paginated hospital
export async function fetchFilteredHealthcareProvider(
  page: number,
  limit: number
): Promise<Hospital[]> {
  try {
    const hospitals = await getAllFilteredHealthcareProvider(page, limit);
    if (hospitals) {
      return (hospitals as Hospital[]) || [];
    } else {
      console.log("No more hospitals found");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getNumberOfHospitals = async () => {
  try {
    const hospitals = await getAllHealthcareProvider();
    if (hospitals) {
      console.log(hospitals);

      const noOfHospitals = hospitals.length;
      console.log("hos", noOfHospitals);
      return noOfHospitals;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};
