"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

interface FuelPricesTableProps {
  prices: FuelPrice[];
  onRefresh: () => void;
  onEdit: (price: FuelPrice) => void;
}

export default function FuelPricesTable({
  prices,
  onRefresh,
  onEdit,
}: FuelPricesTableProps) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/fuel-prices/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete fuel price");
      }

      toast({
        title: "Success",
        description: "Fuel price deleted successfully",
      });
      onRefresh();
    } catch (error) {
      console.error("Error deleting fuel price:", error);
      toast({
        title: "Error",
        description: "Failed to delete fuel price",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Station</TableHead>
            <TableHead>Gasoline</TableHead>
            <TableHead>Gasoil</TableHead>
            <TableHead>LFO</TableHead>
            <TableHead>HFO</TableHead>
            <TableHead>Kerosene</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prices.map((price) => (
            <TableRow key={price.id}>
              <TableCell>{price.fuelStation.name}</TableCell>
              <TableCell>{price.gasolinePrice?.toFixed(2) || '-'}</TableCell>
              <TableCell>{price.gasoilPrice?.toFixed(2) || '-'}</TableCell>
              <TableCell>{price.lfoPrice?.toFixed(2) || '-'}</TableCell>
              <TableCell>{price.hfoPrice?.toFixed(2) || '-'}</TableCell>
              <TableCell>{price.kerosenePrice?.toFixed(2) || '-'}</TableCell>
              <TableCell>{price.startDate ? new Date(price.startDate).toLocaleDateString() : '-'}</TableCell>
              <TableCell>{price.endDate ? new Date(price.endDate).toLocaleDateString() : '-'}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(price)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(price.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 