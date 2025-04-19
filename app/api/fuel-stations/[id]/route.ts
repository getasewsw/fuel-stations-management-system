import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const fuelStation = await prisma.fuelStation.findFirst({
    where: { id, isDeleted: false },
    include: {
      fuelCompany: true,
      region: true,
    },
  });

  if (!fuelStation) {
    return NextResponse.json({ error: "Fuel station not found" }, { status: 404 });
  }

  return NextResponse.json(fuelStation);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();
  const updated = await prisma.fuelStation.updateMany({
    where: { id, isDeleted: false },
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

  if (updated.count === 0) {
    return NextResponse.json({ error: "Fuel station not found" }, { status: 404 });
  }

  // Re-fetch the updated station
  const fuelStation = await prisma.fuelStation.findFirst({
    where: { id, isDeleted: false },
    include: {
      fuelCompany: true,
      region: true,
    },
  });

  return NextResponse.json(fuelStation);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const deleted = await prisma.fuelStation.updateMany({
    where: { id, isDeleted: false },
    data: { isDeleted: true },
  });

  if (deleted.count === 0) {
    return NextResponse.json({ error: "Fuel station not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Fuel station deleted successfully" });
} 