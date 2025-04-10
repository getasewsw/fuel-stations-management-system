'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import StationForm from '@/components/stations/StationForm'

export default function NewStationPage() {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Station</CardTitle>
        </CardHeader>
        <CardContent>
          <StationForm />
        </CardContent>
      </Card>
    </div>
  )
} 