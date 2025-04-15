'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FuelStationsTable from '@/components/FuelStationsTable'
import FuelStationsImportExport from '@/components/FuelStationsImportExport'
import FuelStationModal from '@/components/FuelStationModal'
import { Plus } from 'lucide-react'

export default function StationsPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImportSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleAddSuccess = () => {
    setRefreshKey(prev => prev + 1)
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fuel Stations</CardTitle>
          <div className="flex items-center gap-2">
            <FuelStationsImportExport onImportSuccess={handleImportSuccess} />
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Station
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <FuelStationsTable key={refreshKey} />
        </CardContent>
      </Card>

      <FuelStationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  )
} 