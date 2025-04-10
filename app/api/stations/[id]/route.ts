import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const station = await prisma.station.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        tanks: true,
        transactions: true,
      },
    })
    if (!station) {
      return NextResponse.json({ error: 'Station not found' }, { status: 404 })
    }
    return NextResponse.json(station)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching station' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const station = await prisma.station.update({
      where: { id: parseInt(params.id) },
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
    return NextResponse.json({ error: 'Error updating station' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First, delete all related transactions
    await prisma.transaction.deleteMany({
      where: { stationId: parseInt(params.id) },
    })

    // Then, delete all related tanks
    await prisma.tank.deleteMany({
      where: { stationId: parseInt(params.id) },
    })

    // Finally, delete the station
    await prisma.station.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Station deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting station' }, { status: 500 })
  }
} 