'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  stationId: z.string().min(1, { message: 'Station is required' }),
  amount: z.number().min(0.01, { message: 'Amount must be greater than 0' }),
  price: z.number().min(0.01, { message: 'Price must be greater than 0' }),
  type: z.enum(['IN', 'OUT'], { required_error: 'Type is required' }),
})

type FormData = z.infer<typeof formSchema>

interface Station {
  id: number
  name: string
}

interface Transaction extends FormData {
  id?: number
}

interface TransactionFormProps {
  transaction?: Transaction
  isEditing?: boolean
}

function TransactionForm({ transaction, isEditing }: TransactionFormProps) {
  const router = useRouter()
  const [stations, setStations] = useState<Station[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stationId: transaction?.stationId?.toString() || '',
      amount: transaction?.amount || 0,
      price: transaction?.price || 0,
      type: transaction?.type || 'IN',
    },
  })

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('/api/stations')
        const data = await response.json()
        setStations(data)
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    }

    fetchStations()
  }, [])

  const handleSubmit = async (data: FormData) => {
    try {
      const url = isEditing ? `/api/transactions/${transaction?.id}` : '/api/transactions'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          stationId: parseInt(data.stationId),
        }),
      })

      if (response.ok) {
        router.push('/transactions')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving transaction:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="stationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Station</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a station" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station.id} value={station.id.toString()}>
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IN">IN</SelectItem>
                    <SelectItem value="OUT">OUT</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (L)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    {...field} 
                    onChange={e => field.onChange(parseFloat(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (ETB)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    {...field} 
                    onChange={e => field.onChange(parseFloat(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">
            {isEditing ? 'Update Transaction' : 'Create Transaction'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransactionForm 