'use client'

import { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Flame, Fuel, LucideIcon, MessageCircle, User, MapPin, Building2, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';
import {Newspaper, Receipt} from 'lucide-react'
import FuelStationsTable from "@/components/FuelStationsTable";

import FuelStationsImportExport from "@/components/FuelStationsImportExport";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import FuelStationModal from '@/components/FuelStationModal';
import Image from "next/image";

interface Station {
  id: number
  merchantId: string
  name: string
  zone: string
  woreda: string
  kebele: string
  city: string
  latitude?: number
  longitude?: number
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
  const [refreshKey, setRefreshKey] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast();

  const fetchStations = async () => {
    try {
      const response = await fetch('/api/fuel-stations')
      if (!response.ok) {
        throw new Error("Failed to fetch fuel stations");
      }
      const data = await response.json()
      setStations(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch fuel stations",
        variant: "destructive",
      });
      setStations([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStations()
  }, [refreshKey])

  const handleImportSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleModalSuccess = () => {
    setIsModalOpen(false)
    setRefreshKey(prev => prev + 1)
  }

  // Calculate statistics
  const totalStations = stations.length;
  const uniqueRegions = new Set(stations.map((station) => station.region.name)).size;
  const uniqueCompanies = new Set(stations.map((station) => station.fuelCompany.name)).size;
  const stationsWithLocation = stations.filter(
    (station) => station.latitude && station.longitude
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your fuel station management system
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stations</CardTitle>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
              <Fuel className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active fuel stations in the system
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-900/20 dark:to-green-800/20 border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regions Covered</CardTitle>
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniqueRegions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Different regions with stations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Companies</CardTitle>
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
              <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniqueCompanies}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Different fuel companies
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Geolocated</CardTitle>
            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30">
              <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stationsWithLocation}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Stations with location data
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates in the system</CardDescription>
            </div>
            <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stations.slice(0, 5).map((station) => (
                <div
                  key={station.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{station.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {station.city}, {station.region.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {station.fuelCompany.name}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Fuel Stations</CardTitle>
              <CardDescription>Manage your fuel stations</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <FuelStationsImportExport onImportSuccess={handleImportSuccess} />
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Station
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <FuelStationsTable key={refreshKey} />
          </CardContent>
        </Card>
      </div>

      <FuelStationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
