// to seed the data npx ts-node --project tsconfig.seed.json seed.ts

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  // Create states
  await prisma.healthcareProviderState.createMany({
    data: [
      { id: 1, name: "Abia" },
      { id: 2, name: "Adamawa" },
      { id: 3, name: "Akwa Ibom" },
      { id: 4, name: "Anambra" },
      { id: 5, name: "Bauchi" },
      { id: 6, name: "Bayelsa" },
      { id: 7, name: "Benue" },
      { id: 8, name: "Borno" },
      { id: 9, name: "Cross River" },
      { id: 10, name: "Delta" },
      { id: 11, name: "Ebonyi" },
      { id: 12, name: "Edo" },
      { id: 13, name: "Ekiti" },
      { id: 14, name: "Enugu" },
      { id: 15, name: "Abuja (FCT)" },
      { id: 16, name: "Gombe" },
      { id: 17, name: "Imo" },
      { id: 18, name: "Jigawa" },
      { id: 19, name: "Kaduna" },
      { id: 20, name: "Kano" },
      { id: 21, name: "Katsina" },
      { id: 22, name: "Kebbi" },
      { id: 23, name: "Kogi" },
      { id: 24, name: "Kwara" },
      { id: 25, name: "Lagos" },
      { id: 26, name: "Nasarawa" },
      { id: 27, name: "Niger" },
      { id: 28, name: "Ogun" },
      { id: 29, name: "Ondo" },
      { id: 30, name: "Osun" },
      { id: 31, name: "Oyo" },
      { id: 32, name: "Plateau" },
      { id: 33, name: "Rivers" },
      { id: 34, name: "Sokoto" },
      { id: 35, name: "Taraba" },
      { id: 36, name: "Yobe" },
      { id: 37, name: "Zamfara" },
    ],
  });

  // Create types
  await prisma.healthcareProviderType.createMany({
    data: [
      { id: 1, name: "Clinic" },
      { id: 2, name: "Optical Center" },
      { id: 3, name: "Hospital" },
      { id: 4, name: "Dermatological Center" },
      { id: 5, name: "Dental Clinic" },
      { id: 6, name: "Physiotherapy Clinic" },
      { id: 7, name: "Orthopedic Center" },
      { id: 8, name: "Psychotherapy Center" },
      { id: 9, name: "Tertiary Care Center" },
      { id: 10, name: "ENT" },
      { id: 11, name: "Psychiatry Center" },
    ],
  });

  // Create tiers
  await prisma.healthcareProviderTier.createMany({
    data: [
      { id: 1, name: "Tier 1" },
      { id: 2, name: "Tier 2" },
      { id: 3, name: "Tier 3" },
      { id: 4, name: "Tier 4" },
      { id: 5, name: "Tier 5" },
    ],
  });

  // Read provider data
  const filePath = path.resolve(__dirname, "provider.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
    data: {
      id: number;
      name: string;
      address?: string;
      phone_number?: string;
      tier_id: number;
      type_id: number;
      state: { id: number; name: string };
      location?: string;
    }[];
  };

  // filter out rows that are gym and spa
  const filteredData = jsonData.data.filter(
    (item) => !["Gym", "Spa"].includes(item.name)
  );

  console.log(`Filtered Data: ${JSON.stringify(filteredData, null, 2)}`);

  for (const item of filteredData) {
    console.log(`Processing item: ${JSON.stringify(item)}`);

    // Check if IDs are defined
    if (
      item.tier_id === undefined ||
      item.type_id === undefined ||
      item.state.id === undefined
    ) {
      console.error(`Invalid item (missing id): ${JSON.stringify(item)}`);
      continue;
    }

    try {
      const result = await prisma.healthcareProvider.create({
        data: {
          name: item.name,
          address: item.address,
          phone_number: item.phone_number,
          state: {
            connect: { id: item.state.id },
          },
          type: {
            connect: { id: item.type_id },
          },
          tier: {
            connect: { id: item.tier_id },
          },
          location: item.location,
        },
      });

      console.log(`Inserted: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error(`Error inserting item: ${error}`);
    }
  }

  console.log("Data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
