'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import StationsTable from '@/components/stations/StationsTable'
import { Plus } from 'lucide-react'

interface Station {
  id: number
  merchant_id: string
  name: string
  zone: string
  woreda: string
  kebele: string
  specific_location: string
  city: string
  created_at: string
  updated_at: string
  region_id: string
  fuel_company_id: string
  known_name?: string
  latitude: number
  longitude: number
  gasoline_price?: number
  gasoil_price?: number
  kerosene_price?: number
  lfo_price?: number
  hfo_price?: number
}

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([])

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

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fuel Stations</h1>
        <Link href="/stations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Station
          </Button>
        </Link>
      </div>
      <StationsTable stations={stations} />
    </div>
  )
} 