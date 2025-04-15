"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FuelPricesTable from "@/components/FuelPricesTable";
import FuelPriceModal from "@/components/FuelPriceModal";

interface FuelPrice {
  id: number;
  fuelStationId: number;
  gasolinePrice: number | null;
  gasoilPrice: number | null;
  lfoPrice: number | null;
  hfoPrice: number | null;
  kerosenePrice: number | null;
  startDate: string | null;
  endDate: string | null;
  fuelStation: {
    name: string;
  };
}

export default function FuelPricesPage() {
  const [prices, setPrices] = useState<FuelPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<FuelPrice | null>(null);
  const { toast } = useToast();

  const fetchPrices = async () => {
    try {
      const response = await fetch("/api/fuel-prices");
      if (!response.ok) {
        throw new Error("Failed to fetch fuel prices");
      }
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch fuel prices",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleEdit = (price: FuelPrice) => {
    setSelectedPrice(price);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedPrice(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fuel Prices</CardTitle>
          <Button onClick={() => setIsModalOpen(true)}>
            Add Price
          </Button>
        </CardHeader>
        <CardContent>
          <FuelPricesTable
            prices={prices}
            onRefresh={fetchPrices}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      <FuelPriceModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSuccess={fetchPrices}
        initialData={selectedPrice || undefined}
      />
    </div>
  );
} 