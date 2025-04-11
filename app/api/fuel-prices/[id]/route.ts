import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fuelPrice = await prisma.fuelPrice.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        fuelStation: true,
      },
    });

    if (!fuelPrice) {
      return NextResponse.json(
        { error: "Fuel price not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(fuelPrice);
  } catch (error) {
    console.error("Error fetching fuel price:", error);
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
      where: { id: parseInt(params.id) },
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
    await prisma.fuelPrice.delete({
      where: { id: parseInt(params.id) },
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