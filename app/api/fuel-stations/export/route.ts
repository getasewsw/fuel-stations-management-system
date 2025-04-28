import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface FuelStation {
  id: number;
  merchantId: string;
  name: string;
  zone: string | null;
  woreda: string | null;
  kebele: string | null;
  city: string | null;
  regionId: number | null;
  region?: { 
    id: number;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  fuelCompanyId: number | null;
  fuelCompany?: { 
    id: number;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  known_name: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export async function GET() {
  try {
    const fuelStations = await prisma.fuelStation.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        region: true,
        fuelCompany: true,
      },
    });

    // Convert to CSV
    const headers = [
      "ID",
      "Merchant ID",
      "Name",
      "Zone",
      "Woreda",
      "Kebele",
      "City",
      "Region ID",
      "Region Name",
      "Company ID",
      "Company Name",
      "Known Name",
      "Latitude",
      "Longitude",
      "Created At",
      "Updated At"
    ];

    const csvRows = fuelStations.map((station: FuelStation) => [
      station.id,
      station.merchantId,
      station.name,
      station.zone,
      station.woreda,
      station.kebele,
      station.city,
      station.regionId,
      station.region?.name || "",
      station.fuelCompanyId,
      station.fuelCompany?.name || "",
      station.known_name || "",
      station.latitude,
      station.longitude,
      station.createdAt,
      station.updatedAt
    ]);

    const csvContent = [
      headers.join(","),
      ...csvRows.map((row: (string | number | Date | null)[]) => 
        row.map((cell: string | number | Date | null) => {
          if (cell instanceof Date) {
            return `"${cell.toISOString()}"`;
          }
          return typeof cell === "string" ? `"${cell.replace(/"/g, '""')}"` : cell;
        }).join(",")
      )
    ].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=fuel-stations.csv",
      },
    });
  } catch (error) {
    console.error("Error exporting fuel stations:", error);
    return new NextResponse("Error exporting fuel stations", { status: 500 });
  }
} 