import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
      include: {
        station: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching transaction' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id
    const data = await request.json()
    const { stationId, amount, price, type } = data

    // Get the current transaction
    const currentTransaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    })

    if (!currentTransaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }

    // Update transaction
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        stationId,
        amount,
        price,
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
    console.error('Error updating transaction:', error)
    return NextResponse.json(
      { error: 'Error updating transaction' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id
    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting transaction' },
      { status: 500 }
    )
  }
} 