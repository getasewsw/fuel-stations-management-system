'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import StationForm from '@/components/stations/StationForm'

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

export default function EditStationPage() {
  const params = useParams()
  const [station, setStation] = useState<Station | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await fetch(`/api/stations/${params.id}`)
        const data = await response.json()
        setStation(data)
      } catch (error) {
        console.error('Error fetching station:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStation()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!station) {
    return <div>Station not found</div>
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Station</CardTitle>
        </CardHeader>
        <CardContent>
          <StationForm station={station} isEditing />
        </CardContent>
      </Card>
    </div>
  )
} 