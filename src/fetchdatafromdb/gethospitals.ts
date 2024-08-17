import { db } from "@/lib/db";

export const getAllHealthcareProvider = async () => {
  try {
    const heathcareproviders = await db.healthcareProvider.findMany({
      include: {
        state: true,
        type: true,
        tier: true,
      },
    });
    return heathcareproviders;
  } catch (error) {
    return null;
  }
};

// Fetch paginated hospitals
export async function getAllFilteredHealthcareProvider(
  page: number,
  limit: number
) {
  try {
    const filteredheathcareproviders = db.healthcareProvider.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        type: true,
        tier: true,
        state: true,
      },
    });

    return filteredheathcareproviders;
  } catch (error) {
    return null;
  }
}
