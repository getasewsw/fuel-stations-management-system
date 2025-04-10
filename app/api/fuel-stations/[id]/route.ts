import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const fuelStation = await prisma.fuelStation.update({
      where: {
        id: parseInt(params.id),
      },
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
      { error: "Failed to update fuel station" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.fuelStation.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ message: "Fuel station deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete fuel station" },
      { status: 500 }
    );
  }
} 