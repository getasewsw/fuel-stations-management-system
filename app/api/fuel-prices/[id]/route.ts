import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id: idStr } = await params;               // await the params promise
  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  // Use findFirst instead of findUnique when filtering on non-unique fields
  const fuelPrice = await prisma.fuelPrice.findFirst({
    where: { id, isDeleted: false },
    include: { fuelStation: true },
  });
  if (!fuelPrice) {
    return NextResponse.json({ error: "Fuel price not found" }, { status: 404 });
  }
  return NextResponse.json(fuelPrice);
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
  const {
    gasolinePrice,
    gasoilPrice,
    lfoPrice,
    hfoPrice,
    kerosenePrice,
    startDate,
    endDate,
    fuelStationId,
  } = body;

  const updated = await prisma.fuelPrice.updateMany({ // updateMany allows composite filters
    where: { id, isDeleted: false },
    data: {
      gasolinePrice,
      gasoilPrice,
      lfoPrice,
      hfoPrice,
      kerosenePrice,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      fuelStationId,
    },
  });
  if (updated.count === 0) {
    return NextResponse.json({ error: "Fuel price not found" }, { status: 404 });
  }
  // Re-fetch or return a simple success message
  return NextResponse.json({ message: "Fuel price updated successfully" });
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

  const deleted = await prisma.fuelPrice.updateMany({
    where: { id, isDeleted: false },
    data: { isDeleted: true },
  });
  if (deleted.count === 0) {
    return NextResponse.json({ error: "Fuel price not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Fuel price deleted successfully" });
}
