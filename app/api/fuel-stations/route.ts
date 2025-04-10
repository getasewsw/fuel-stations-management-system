import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const fuelStations = await prisma.fuelStation.findMany({
      include: {
        region: true,
        fuelCompany: true,
      },
    });
    return NextResponse.json(fuelStations);
  } catch (error) {
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
    return NextResponse.json(
      { error: "Failed to create fuel station" },
      { status: 500 }
    );
  }
} 