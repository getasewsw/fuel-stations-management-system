import { prisma } from '@/lib/prisma'
import TransactionsTable from '@/components/transactions/TransactionsTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function TransactionsPage() {
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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Track and manage fuel transactions across stations
          </p>
        </div>
        <Button asChild>
          <Link href="/transactions/new">Add Transaction</Link>
        </Button>
      </div>
      <TransactionsTable transactions={transactions} />
    </div>
  )
} 