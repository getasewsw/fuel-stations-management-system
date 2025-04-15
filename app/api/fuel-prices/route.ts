import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching fuel prices...");
    const fuelPrices = await prisma.fuelPrice.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        fuelStation: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("Found fuel prices:", fuelPrices.length);
    return NextResponse.json(fuelPrices);
  } catch (error) {
    console.error("Detailed error in GET /api/fuel-prices:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch fuel prices: ${error.message}` },
        { status: 500 }
      );
    }
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