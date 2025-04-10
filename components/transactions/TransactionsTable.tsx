'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface Transaction {
  id: number
  stationId: number
  amount: number
  price: number
  type: 'IN' | 'OUT'
  createdAt: string
  station: {
    name: string
  }
}

interface TransactionsTableProps {
  transactions: Transaction[]
  limit?: number
  title?: string
}

function TransactionsTable({ transactions = [], limit, title }: TransactionsTableProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  // Ensure transactions is an array
  const transactionsArray = Array.isArray(transactions) ? transactions : []
  const filteredTransactions = limit ? transactionsArray.slice(0, limit) : transactionsArray

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting transaction:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (transactionsArray.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="p-4">
          <h2 className="text-2xl font-semibold tracking-tight">{title ? title : 'Transactions'}</h2>
          <p className="text-sm text-muted-foreground">No transactions found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <div className="p-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title ? title : 'Transactions'}</h2>
        <p className="text-sm text-muted-foreground">Track fuel transactions across stations</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Station</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount (L)</TableHead>
            <TableHead>Price (ETB)</TableHead>
            <TableHead>Total (ETB)</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.station.name}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  transaction.type === 'IN' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {transaction.type}
                </span>
              </TableCell>
              <TableCell>{transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.price.toFixed(2)}</TableCell>
              <TableCell>{(transaction.amount * transaction.price).toFixed(2)}</TableCell>
              <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(`/transactions/edit/${transaction.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the transaction.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(transaction.id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TransactionsTable 