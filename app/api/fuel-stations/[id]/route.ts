import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Starting PUT request for fuel station with ID:", params.id);
  
  try {
    const id = parseInt(params.id);
    console.log("Parsed ID:", id);

    if (isNaN(id)) {
      console.error("Invalid ID:", params.id);
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));

    try {
      const result = await prisma.$queryRawUnsafe(`
        UPDATE fuel_station
        SET 
          merchant_id = ?,
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
        WHERE id = ? AND is_deleted = 0
        RETURNING *;
      `,
        body.merchantId,
        body.name,
        body.zone,
        body.woreda,
        body.kebele,
        body.city,
        parseInt(body.regionId),
        parseInt(body.fuelCompanyId),
        body.known_name,
        body.latitude ? parseFloat(body.latitude) : null,
        body.longitude ? parseFloat(body.longitude) : null,
        id
      );

      console.log("Update result:", JSON.stringify(result, null, 2));

      if (!result || (Array.isArray(result) && result.length === 0)) {
        console.log("Fuel station not found");
        return NextResponse.json(
          { error: "Fuel station not found" },
          { status: 404 }
        );
      }

      const fuelStation = Array.isArray(result) ? result[0] : result;

      // Transform the result to match the expected format
      const transformedResult = {
        id: fuelStation.id,
        merchantId: fuelStation.merchant_id,
        name: fuelStation.name,
        zone: fuelStation.zone,
        woreda: fuelStation.woreda,
        kebele: fuelStation.kebele,
        city: fuelStation.city,
        regionId: fuelStation.region_id,
        fuelCompanyId: fuelStation.fuel_company_id,
        known_name: fuelStation.known_name,
        latitude: fuelStation.latitude,
        longitude: fuelStation.longitude,
        createdAt: fuelStation.created_at,
        updatedAt: fuelStation.updated_at,
        isDeleted: fuelStation.is_deleted === 1
      };

      console.log("Returning updated fuel station:", JSON.stringify(transformedResult, null, 2));
      return NextResponse.json(transformedResult);
    } catch (queryError) {
      console.error("Query error:", queryError);
      return NextResponse.json(
        { error: "Database query error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating fuel station:", error);
    console.error("Error details:", {
      id: params.id,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: "Failed to update fuel station" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Starting DELETE request for fuel station with ID:", params.id);
  
  try {
    const id = parseInt(params.id);
    console.log("Parsed ID:", id);

    if (isNaN(id)) {
      console.error("Invalid ID:", params.id);
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    try {
      const result = await prisma.$queryRawUnsafe(`
        UPDATE fuel_station
        SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND is_deleted = 0
        RETURNING id;
      `, id);

      console.log("Delete result:", JSON.stringify(result, null, 2));

      if (!result || (Array.isArray(result) && result.length === 0)) {
        console.log("Fuel station not found");
        return NextResponse.json(
          { error: "Fuel station not found" },
          { status: 404 }
        );
      }

      console.log("Fuel station deleted successfully");
      return NextResponse.json({ message: "Fuel station deleted successfully" });
    } catch (queryError) {
      console.error("Query error:", queryError);
      return NextResponse.json(
        { error: "Database query error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting fuel station:", error);
    console.error("Error details:", {
      id: params.id,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: "Failed to delete fuel station" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Starting GET request for fuel station with ID:", params.id);
  
  try {
    const id = parseInt(params.id);
    console.log("Parsed ID:", id);

    if (isNaN(id)) {
      console.error("Invalid ID:", params.id);
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    console.log("Querying fuel station with ID:", id);
    try {
      const result = await prisma.$queryRawUnsafe(`
        SELECT 
          fs.*,
          fc.id as company_id,
          fc.name as company_name,
          fc.code as company_code,
          r.id as region_id,
          r.name as region_name,
          r.code as region_code
        FROM fuel_station fs
        LEFT JOIN fuel_company fc ON fs.fuel_company_id = fc.id
        LEFT JOIN region r ON fs.region_id = r.id
        WHERE fs.id = ? AND fs.is_deleted = 0
      `, id);

      console.log("Query result:", JSON.stringify(result, null, 2));

      if (!result || (Array.isArray(result) && result.length === 0)) {
        console.log("Fuel station not found");
        return NextResponse.json(
          { error: "Fuel station not found" },
          { status: 404 }
        );
      }

      const fuelStation = Array.isArray(result) ? result[0] : result;

      // Transform the result to match the expected format
      const transformedResult = {
        id: fuelStation.id,
        merchantId: fuelStation.merchant_id,
        name: fuelStation.name,
        zone: fuelStation.zone,
        woreda: fuelStation.woreda,
        kebele: fuelStation.kebele,
        city: fuelStation.city,
        regionId: fuelStation.region_id,
        fuelCompanyId: fuelStation.fuel_company_id,
        known_name: fuelStation.known_name,
        latitude: fuelStation.latitude,
        longitude: fuelStation.longitude,
        createdAt: fuelStation.created_at,
        updatedAt: fuelStation.updated_at,
        isDeleted: fuelStation.is_deleted === 1,
        fuelCompany: {
          id: fuelStation.company_id,
          name: fuelStation.company_name,
          code: fuelStation.company_code,
        },
        region: {
          id: fuelStation.region_id,
          name: fuelStation.region_name,
          code: fuelStation.region_code,
        }
      };

      console.log("Returning fuel station:", JSON.stringify(transformedResult, null, 2));
      return NextResponse.json(transformedResult);
    } catch (queryError) {
      console.error("Query error:", queryError);
      return NextResponse.json(
        { error: "Database query error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching fuel station:", error);
    console.error("Error details:", {
      id: params.id,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: "Failed to fetch fuel station" },
      { status: 500 }
    );
  }
} 