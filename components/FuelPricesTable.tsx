"use client";

import { useState, useEffect } from "react";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface FuelPrice {
  id: number;
  fuelStationId: number;
  fuelStation: {
    name: string;
  };
  gasolinePrice: number | null;
  gasoilPrice: number | null;
  lfoPrice: number | null;
  hfoPrice: number | null;
  kerosenePrice: number | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FuelPricesTableProps {
  onEdit: (id: number) => void;
}

export default function FuelPricesTable({ onEdit }: FuelPricesTableProps) {
  const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFuelPrices();
  }, []);

  const fetchFuelPrices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/fuel-prices");
      if (!response.ok) {
        throw new Error("Failed to fetch fuel prices");
      }
      const data = await response.json();
      setFuelPrices(data || []);
    } catch (error) {
      console.error("Error fetching fuel prices:", error);
      toast({
        title: "Error",
        description: "Failed to fetch fuel prices",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/fuel-prices/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Fuel price deleted successfully",
        });
        fetchFuelPrices();
      } else {
        throw new Error("Failed to delete fuel price");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete fuel price",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fuelPrices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center">
                No fuel prices found
              </TableCell>
            </TableRow>
          ) : (
            fuelPrices.map((price) => (
              <TableRow key={price.id}>
                <TableCell>{price.fuelStation.name}</TableCell>
                <TableCell>{price.gasolinePrice?.toFixed(2) || "-"}</TableCell>
                <TableCell>{price.gasoilPrice?.toFixed(2) || "-"}</TableCell>
                <TableCell>{price.lfoPrice?.toFixed(2) || "-"}</TableCell>
                <TableCell>{price.hfoPrice?.toFixed(2) || "-"}</TableCell>
                <TableCell>{price.kerosenePrice?.toFixed(2) || "-"}</TableCell>
                <TableCell>
                  {price.startDate ? new Date(price.startDate).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>
                  {price.endDate ? new Date(price.endDate).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>{new Date(price.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(price.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(price.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the fuel price.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(price.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 