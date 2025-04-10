import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tanks = await prisma.tank.findMany({
      include: {
        station: true,
        transactions: true,
      },
    })
    return NextResponse.json(tanks)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tanks' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const tank = await prisma.tank.create({
      data: {
        stationId: body.stationId,
        capacity: body.capacity,
        fuelType: body.fuelType,
        currentLevel: body.currentLevel,
      },
    })
    return NextResponse.json(tank)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating tank' }, { status: 500 })
  }
} 