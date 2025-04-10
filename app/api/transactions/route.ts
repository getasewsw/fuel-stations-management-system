import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        station: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching transactions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { stationId, amount, price, type } = data

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        stationId: Number(stationId),
        amount: Number(amount),
        price: Number(price),
        type,
      },
      include: {
        station: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Error creating transaction' },
      { status: 500 }
    )
  }
} 