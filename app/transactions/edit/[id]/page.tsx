import { prisma } from '@/lib/prisma'
import TransactionForm from '@/components/transactions/TransactionForm'
import { notFound } from 'next/navigation'

interface EditTransactionPageProps {
  params: {
    id: string
  }
}

export default async function EditTransactionPage({ params }: EditTransactionPageProps) {
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
    notFound()
  }

  // Transform the transaction data to match the form's expected format
  const transformedTransaction = {
    id: transaction.id,
    stationId: transaction.stationId.toString(),
    amount: transaction.amount,
    price: transaction.price,
    type: transaction.type as 'IN' | 'OUT',
    station: transaction.station,
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Transaction</h1>
        <p className="text-muted-foreground">
          Update transaction details
        </p>
      </div>
      <TransactionForm transaction={transformedTransaction} isEditing />
    </div>
  )
} 