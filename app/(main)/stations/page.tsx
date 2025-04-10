'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FuelStationsTable from '@/components/FuelStationsTable'
import { Plus } from 'lucide-react'

export default function StationsPage() {
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
      <FuelStationsTable />
    </div>
  )
} 