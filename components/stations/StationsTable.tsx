'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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

interface Station {
  id: number
  merchant_id: string
  name: string
  zone: string
  woreda: string
  city: string
  region_id: string
  fuel_company_id: string
  gasoline_price?: number
  gasoil_price?: number
}

interface StationsTableProps {
  stations: Station[]
  limit?: number
  title?: string
}

function StationsTable({ stations = [], limit, title }: StationsTableProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  // Ensure stations is an array
  const stationsArray = Array.isArray(stations) ? stations : []
  const filteredStations = limit ? stationsArray.slice(0, limit) : stationsArray

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/stations/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting station:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (stationsArray.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="p-4">
          <h2 className="text-2xl font-semibold tracking-tight">{title ? title : 'Fuel Stations'}</h2>
          <p className="text-sm text-muted-foreground">No stations found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <div className="p-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title ? title : 'Fuel Stations'}</h2>
        <p className="text-sm text-muted-foreground">Manage and track fuel stations across regions</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Gasoline Price</TableHead>
            <TableHead>Gasoil Price</TableHead>
            <TableHead className="hidden md:table-cell">Region</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStations.map((station: Station) => (
            <TableRow key={station.id} className="group">
              <TableCell className="font-medium">
                <Link href={`/stations/${station.id}`} className="hover:underline">
                  {station.name}
                </Link>
              </TableCell>
              <TableCell>
                {station.zone}, {station.woreda}
              </TableCell>
              <TableCell>
                {station.gasoline_price ? `${station.gasoline_price.toFixed(2)} ETB` : '-'}
              </TableCell>
              <TableCell>
                {station.gasoil_price ? `${station.gasoil_price.toFixed(2)} ETB` : '-'}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {station.region_id}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(`/stations/${station.id}/edit`)}
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
                          This action cannot be undone. This will permanently delete the station
                          and all its associated data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(station.id)}
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

export default StationsTable 