import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const fuelPrices = await prisma.fuelPrice.findMany({
      include: {
        fuelStation: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(fuelPrices);
  } catch (error) {
    console.error("Error fetching fuel prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch fuel prices" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fuelPrice = await prisma.fuelPrice.create({
      data: {
        fuelStationId: parseInt(data.fuelStationId),
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
    console.error("Error creating fuel price:", error);
    return NextResponse.json(
      { error: "Failed to create fuel price" },
      { status: 500 }
    );
  }
} 