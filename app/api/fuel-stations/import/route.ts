import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parse } from "csv-parse/sync";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const content = await file.text();
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!records || records.length === 0) {
      return NextResponse.json(
        { error: "No valid records found in the CSV file" },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = [
      "Merchant ID",
      "Name",
      "Zone",
      "Woreda",
      "Kebele",
      "City",
      "Region ID",
      "Company ID"
    ];

    for (const record of records) {
      const missingFields = requiredFields.filter(
        field => !record[field] || record[field].trim() === ""
      );
      
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required fields: ${missingFields.join(", ")}` },
          { status: 400 }
        );
      }
    }

    // Process each record
    for (const record of records) {
      try {
        const data = {
          merchantId: record["Merchant ID"],
          name: record["Name"],
          zone: record["Zone"],
          woreda: record["Woreda"],
          kebele: record["Kebele"],
          city: record["City"],
          regionId: parseInt(record["Region ID"]),
          fuelCompanyId: parseInt(record["Company ID"]),
          known_name: record["Known Name"] || null,
          latitude: record["Latitude"] ? parseFloat(record["Latitude"]) : null,
          longitude: record["Longitude"] ? parseFloat(record["Longitude"]) : null,
        };

        // Check if the station exists
        const existingStation = await prisma.fuelStation.findFirst({
          where: {
            merchantId: data.merchantId,
            isDeleted: false,
          },
        });

        if (existingStation) {
          // Update existing station
          await prisma.fuelStation.update({
            where: {
              id: existingStation.id,
            },
            data,
          });
        } else {
          // Create new station
          await prisma.fuelStation.create({
            data,
          });
        }
      } catch (error) {
        console.error("Error processing record:", record, error);
        return NextResponse.json(
          { error: `Failed to process record: ${error instanceof Error ? error.message : "Unknown error"}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Import successful" });
  } catch (error) {
    console.error("Error importing fuel stations:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to import fuel stations" },
      { status: 500 }
    );
  }
} 