import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Starting GET request for fuel price with ID:", params.id);
  
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

    console.log("Checking database connection...");
    try {
      await prisma.$connect();
      console.log("Database connection successful");
    } catch (connectionError) {
      console.error("Database connection error:", connectionError);
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }

    console.log("Querying fuel price with ID:", id);
    try {
      const result = await prisma.$queryRawUnsafe(`
        SELECT 
          fp.*,
          fs.id as station_id,
          fs.name as station_name,
          fs.zone as station_zone,
          fs.woreda as station_woreda,
          fs.kebele as station_kebele,
          fs.city as station_city
        FROM fuel_price fp
        LEFT JOIN fuel_station fs ON fp.fuel_station_id = fs.id
        WHERE fp.id = ? AND fp.is_deleted = 0
      `, id);

      console.log("Query result:", JSON.stringify(result, null, 2));

      if (!result || (Array.isArray(result) && result.length === 0)) {
        console.log("Fuel price not found");
        return NextResponse.json(
          { error: "Fuel price not found" },
          { status: 404 }
        );
      }

      const fuelPrice = Array.isArray(result) ? result[0] : result;

      // Transform the result to match the expected format
      const transformedResult = {
        id: fuelPrice.id,
        fuelStationId: fuelPrice.fuel_station_id,
        gasolinePrice: fuelPrice.gasoline_price,
        gasoilPrice: fuelPrice.gasoil_price,
        lfoPrice: fuelPrice.lfo_price,
        hfoPrice: fuelPrice.hfo_price,
        kerosenePrice: fuelPrice.kerosene_price,
        startDate: fuelPrice.start_date,
        endDate: fuelPrice.end_date,
        createdAt: fuelPrice.created_at,
        updatedAt: fuelPrice.updated_at,
        isDeleted: fuelPrice.is_deleted === 1,
        fuelStation: {
          id: fuelPrice.station_id,
          name: fuelPrice.station_name,
          zone: fuelPrice.station_zone,
          woreda: fuelPrice.station_woreda,
          kebele: fuelPrice.station_kebele,
          city: fuelPrice.station_city,
        }
      };

      console.log("Returning fuel price:", JSON.stringify(transformedResult, null, 2));
      return NextResponse.json(transformedResult);
    } catch (queryError) {
      console.error("Query error:", queryError);
      return NextResponse.json(
        { error: "Database query error" },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error("Error fetching fuel price:", error);
    console.error("Error details:", {
      id: params.id,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: "Failed to fetch fuel price" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const fuelPrice = await prisma.fuelPrice.update({
      where: { 
        id: parseInt(params.id),
        isDeleted: false,
      },
      data: {
        fuelStationId: data.fuelStationId,
        gasolinePrice: data.gasolinePrice,
        gasoilPrice: data.gasoilPrice,
        lfoPrice: data.lfoPrice,
        hfoPrice: data.hfoPrice,
        kerosenePrice: data.kerosenePrice,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
      include: {
        fuelStation: true,
      },
    });

    return NextResponse.json(fuelPrice);
  } catch (error) {
    console.error("Error updating fuel price:", error);
    return NextResponse.json(
      { error: "Failed to update fuel price" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fuelPrice = await prisma.fuelPrice.update({
      where: { 
        id: parseInt(params.id),
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    return NextResponse.json({ message: "Fuel price deleted successfully" });
  } catch (error) {
    console.error("Error deleting fuel price:", error);
    return NextResponse.json(
      { error: "Failed to delete fuel price" },
      { status: 500 }
    );
  }
} 