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

    console.log("Received file:", file.name);

    const content = await file.text();
    console.log("File content:", content.substring(0, 200)); // Log first 200 chars

    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    console.log("Parsed records:", records);

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
        console.log("Processing record:", record);
        
        // First check if the station exists
        const existingStation = await prisma.$queryRawUnsafe(`
          SELECT id FROM fuel_station 
          WHERE merchant_id = ? AND is_deleted = 0
        `, record["Merchant ID"]);

        if (existingStation && Array.isArray(existingStation) && existingStation.length > 0) {
          // Update existing station
          await prisma.$queryRawUnsafe(`
            UPDATE fuel_station SET
              name = ?,
              zone = ?,
              woreda = ?,
              kebele = ?,
              city = ?,
              region_id = ?,
              fuel_company_id = ?,
              known_name = ?,
              latitude = ?,
              longitude = ?,
              updated_at = CURRENT_TIMESTAMP
            WHERE merchant_id = ? AND is_deleted = 0
          `,
            record["Name"],
            record["Zone"],
            record["Woreda"],
            record["Kebele"],
            record["City"],
            parseInt(record["Region ID"]),
            parseInt(record["Company ID"]),
            record["Known Name"] || null,
            record["Latitude"] ? parseFloat(record["Latitude"]) : null,
            record["Longitude"] ? parseFloat(record["Longitude"]) : null,
            record["Merchant ID"]
          );
        } else {
          // Insert new station
          await prisma.$queryRawUnsafe(`
            INSERT INTO fuel_station (
              merchant_id,
              name,
              zone,
              woreda,
              kebele,
              city,
              region_id,
              fuel_company_id,
              known_name,
              latitude,
              longitude,
              created_at,
              updated_at,
              is_deleted
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0
            )
          `,
            record["Merchant ID"],
            record["Name"],
            record["Zone"],
            record["Woreda"],
            record["Kebele"],
            record["City"],
            parseInt(record["Region ID"]),
            parseInt(record["Company ID"]),
            record["Known Name"] || null,
            record["Latitude"] ? parseFloat(record["Latitude"]) : null,
            record["Longitude"] ? parseFloat(record["Longitude"]) : null
          );
        }
      } catch (error) {
        console.error("Error processing record:", record, error);
        throw error;
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