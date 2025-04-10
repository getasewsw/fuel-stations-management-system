import TransactionForm from '@/components/transactions/TransactionForm'

export default function NewTransactionPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">New Transaction</h1>
        <p className="text-muted-foreground">
          Record a new fuel transaction
        </p>
      </div>
      <TransactionForm />
    </div>
  )
} 