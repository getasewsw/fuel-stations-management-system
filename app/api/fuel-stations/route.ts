import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching fuel stations...");
    const fuelStations = await prisma.fuelStation.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        region: true,
        fuelCompany: true,
      },
    });
    console.log(`Found ${fuelStations.length} fuel stations`);
    return NextResponse.json(fuelStations);
  } catch (error) {
    console.error("Detailed error in GET /api/fuel-stations:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch fuel stations: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch fuel stations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fuelStation = await prisma.fuelStation.create({
      data: {
        merchantId: body.merchantId,
        name: body.name,
        zone: body.zone,
        woreda: body.woreda,
        kebele: body.kebele,
        city: body.city,
        regionId: parseInt(body.regionId),
        fuelCompanyId: parseInt(body.fuelCompanyId),
        known_name: body.known_name,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
      },
    });
    return NextResponse.json(fuelStation);
  } catch (error) {
    console.error("Error creating fuel station:", error);
    return NextResponse.json(
      { error: "Failed to create fuel station" },
      { status: 500 }
    );
  }
} 