import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const csvRows = fuelStations.map((station) => [
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
      ...csvRows.map(row => row.map(cell => {
        // Escape commas and quotes in cell values
        if (typeof cell === 'string') {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell === null ? '' : cell;
      }).join(","))
    ].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=fuel-stations.csv"
      }
    });
  } catch (error) {
    console.error("Error exporting fuel stations:", error);
    return NextResponse.json(
      { error: "Failed to export fuel stations" },
      { status: 500 }
    );
  }
} 