import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching fuel companies...");
    const fuelCompanies = await prisma.fuelCompany.findMany();
    console.log("Found fuel companies:", fuelCompanies);
    return NextResponse.json(fuelCompanies);
  } catch (error) {
    console.error("Error fetching fuel companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch fuel companies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Creating fuel company with data:", body);
    const fuelCompany = await prisma.fuelCompany.create({
      data: {
        code: body.code,
        name: body.name,
      },
    });
    console.log("Created fuel company:", fuelCompany);
    return NextResponse.json(fuelCompany);
  } catch (error) {
    console.error("Error creating fuel company:", error);
    return NextResponse.json(
      { error: "Failed to create fuel company" },
      { status: 500 }
    );
  }
} 