import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const fuelPrices = await prisma.fuelPrice.findMany({
      include: {
        fuelStation: true,
      },
    });
    return NextResponse.json(fuelPrices);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch fuel prices" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fuelPrice = await prisma.fuelPrice.create({
      data: {
        fuelStationId: parseInt(body.fuelStationId),
        gasolinePrice: body.gasolinePrice ? parseFloat(body.gasolinePrice) : null,
        gasoilPrice: body.gasoilPrice ? parseFloat(body.gasoilPrice) : null,
        lfoPrice: body.lfoPrice ? parseFloat(body.lfoPrice) : null,
        hfoPrice: body.hfoPrice ? parseFloat(body.hfoPrice) : null,
        kerosenePrice: body.kerosenePrice ? parseFloat(body.kerosenePrice) : null,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
    });
    return NextResponse.json(fuelPrice);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create fuel price" },
      { status: 500 }
    );
  }
} 