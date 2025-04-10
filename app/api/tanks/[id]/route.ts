import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tank = await prisma.tank.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        station: true,
        transactions: true,
      },
    })
    if (!tank) {
      return NextResponse.json({ error: 'Tank not found' }, { status: 404 })
    }
    return NextResponse.json(tank)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tank' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const tank = await prisma.tank.update({
      where: { id: parseInt(params.id) },
      data: {
        stationId: body.stationId,
        capacity: body.capacity,
        fuelType: body.fuelType,
        currentLevel: body.currentLevel,
      },
    })
    return NextResponse.json(tank)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating tank' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.tank.delete({
      where: { id: parseInt(params.id) },
    })
    return NextResponse.json({ message: 'Tank deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting tank' }, { status: 500 })
  }
} 