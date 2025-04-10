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

const formSchema = z.object({
  merchant_id: z.string().min(1, { message: 'Merchant ID is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  zone: z.string().min(1, { message: 'Zone is required' }),
  woreda: z.string().min(1, { message: 'Woreda is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  region_id: z.string().min(1, { message: 'Region ID is required' }),
  fuel_company_id: z.string().min(1, { message: 'Fuel company ID is required' }),
  gasoline_price: z.number().optional(),
  gasoil_price: z.number().optional(),
})

type FormData = z.infer<typeof formSchema>

interface Station extends FormData {
  id?: number
}

interface StationFormProps {
  station?: Station
  isEditing?: boolean
}

function StationForm({ station, isEditing }: StationFormProps) {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      merchant_id: station?.merchant_id || '',
      name: station?.name || '',
      zone: station?.zone || '',
      woreda: station?.woreda || '',
      city: station?.city || '',
      region_id: station?.region_id || '',
      fuel_company_id: station?.fuel_company_id || '',
      gasoline_price: station?.gasoline_price || undefined,
      gasoil_price: station?.gasoil_price || undefined,
    },
  })

  const handleSubmit = async (data: FormData) => {
    try {
      const url = isEditing ? `/api/stations/${station?.id}` : '/api/stations'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/stations')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving station:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="merchant_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Merchant ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Station Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="woreda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Woreda</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuel_company_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Company ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="gasoline_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gasoline Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    {...field} 
                    onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gasoil_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gasoil Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    {...field} 
                    onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">
            {isEditing ? 'Update Station' : 'Create Station'}
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

export default StationForm 