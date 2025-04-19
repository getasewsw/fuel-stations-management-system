"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FuelStationForm from "@/components/FuelStationForm";

interface Station {
  id: number;
  merchantId: string;
  name: string;
  zone: string;
  woreda: string;
  kebele: string;
  city: string;
  regionId: number;
  fuelCompanyId: number;
  known_name: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export default function EditStationPage() {
  const params = useParams();
  const router = useRouter();
  const [station, setStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await fetch(`/api/fuel-stations/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch station");
        }
        const data = await response.json();
        console.log("Fetched station data:", data);
        setStation(data);
      } catch (error) {
        console.error("Error fetching station:", error);
        setError("Failed to load station data");
      } finally {
        setLoading(false);
      }
    };

    fetchStation();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!station) {
    return <div>Station not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Station</CardTitle>
        </CardHeader>
        <CardContent>
          <FuelStationForm
            initialData={station}
            onSuccess={() => router.push("/stations")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
