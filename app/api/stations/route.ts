import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const stations = await prisma.station.findMany({
      include: {
        tanks: true,
        transactions: true,
      },
    })
    return NextResponse.json(stations)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching stations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const station = await prisma.station.create({
      data: {
        merchant_id: body.merchant_id,
        name: body.name,
        zone: body.zone,
        woreda: body.woreda,
        kebele: body.kebele,
        specific_location: body.specific_location,
        city: body.city,
        region_id: body.region_id,
        fuel_company_id: body.fuel_company_id,
        known_name: body.known_name,
        latitude: body.latitude,
        longitude: body.longitude,
        gasoline_price: body.gasoline_price,
        gasoil_price: body.gasoil_price,
        kerosene_price: body.kerosene_price,
        lfo_price: body.lfo_price,
        hfo_price: body.hfo_price,
      },
    })
    return NextResponse.json(station)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating station' }, { status: 500 })
  }
} 