import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stations = await prisma.fuelStation.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        fuelCompany: true,
        region: true,
        FuelPrice: {
          where: {
            isDeleted: false,
          },
        },
      },
    });
    return NextResponse.json(stations);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching stations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const station = await prisma.fuelStation.create({
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
        isDeleted: false,
      },
      include: {
        fuelCompany: true,
        region: true,
      },
    });
    return NextResponse.json(station);
  } catch (error) {
    console.error("Error creating station:", error);
    return NextResponse.json(
      { error: "Error creating station" },
      { status: 500 }
    );
  }
}
