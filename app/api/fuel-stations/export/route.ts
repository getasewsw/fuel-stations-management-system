import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const fuelStations = await prisma.$queryRawUnsafe(`
      SELECT 
        fs.id,
        fs.merchant_id as "merchantId",
        fs.name,
        fs.zone,
        fs.woreda,
        fs.kebele,
        fs.city,
        fs.region_id as "regionId",
        fs.fuel_company_id as "fuelCompanyId",
        fs.known_name as "knownName",
        fs.latitude,
        fs.longitude,
        fs.created_at as "createdAt",
        fs.updated_at as "updatedAt",
        r.name as "regionName",
        fc.name as "companyName"
      FROM fuel_station fs
      LEFT JOIN region r ON fs.region_id = r.id
      LEFT JOIN fuel_company fc ON fs.fuel_company_id = fc.id
      WHERE fs.is_deleted = 0
    `);

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

    const rows = Array.isArray(fuelStations) ? fuelStations : [fuelStations];
    const csvRows = rows.map((station: any) => [
      station.id,
      station.merchantId,
      station.name,
      station.zone,
      station.woreda,
      station.kebele,
      station.city,
      station.regionId,
      station.regionName,
      station.fuelCompanyId,
      station.companyName,
      station.knownName,
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
        return cell;
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