import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching regions...");
    const regions = await prisma.region.findMany();
    console.log("Found regions:", regions);
    return NextResponse.json(regions);
  } catch (error) {
    console.error("Error fetching regions:", error);
    return NextResponse.json(
      { error: "Failed to fetch regions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Creating region with data:", body);
    const region = await prisma.region.create({
      data: {
        code: body.code,
        name: body.name,
      },
    });
    console.log("Created region:", region);
    return NextResponse.json(region);
  } catch (error) {
    console.error("Error creating region:", error);
    return NextResponse.json(
      { error: "Failed to create region" },
      { status: 500 }
    );
  }
} 