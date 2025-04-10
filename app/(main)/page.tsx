'use client'

import { useEffect, useState } from 'react'
import {Button} from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Flame, Fuel, LucideIcon, MessageCircle, User } from 'lucide-react';
import {Newspaper, Receipt} from 'lucide-react'
import FuelStationsTable from "@/components/FuelStationsTable";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";

interface Station {
  id: number
  merchantId: string
  name: string
  zone: string
  woreda: string
  city: string
  regionId: number
  fuelCompanyId: number
  region: {
    id: number
    code: string
    name: string
  }
  fuelCompany: {
    id: number
    code: string
    name: string
  }
}

export default function Home() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStations = async () => {
      try {
        console.log('Fetching stations...')
        const response = await fetch('/api/fuel-stations')
        const data = await response.json()
        console.log('Fetched stations:', data)
        setStations(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching stations:', error)
        setStations([])
      } finally {
        setLoading(false)
      }
    }

    fetchStations()
  }, [])

  if (loading) {
    return <div>Loading stations...</div>
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-5 mb-6 md:flex-row">
        <DashboardCard 
          title="Price"
          count={120} 
          icon={<Receipt className="text-slate-400" size={72} />}
        />
        <DashboardCard 
          title="Station"
          count={99} 
          icon={<Fuel className="text-slate-400" size={72} />}
        />
        <DashboardCard 
          title="Users"
          count={700} 
          icon={<User className="text-slate-400" size={72} />}
        />
        <DashboardCard 
          title="Fuel Types"
          count={120} 
          icon={<Flame className="text-slate-400" size={72} />}
        />
      </div>

      <FuelStationsTable />
      <AnalyticsCharts />
    </>
  );
}
