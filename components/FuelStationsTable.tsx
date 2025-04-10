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

interface FuelStation {
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
  region: {
    name: string;
  };
  fuelCompany: {
    name: string;
  };
}

export default function FuelStationsTable() {
  const [fuelStations, setFuelStations] = useState<FuelStation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFuelStations();
  }, []);

  const fetchFuelStations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/fuel-stations");
      if (!response.ok) {
        throw new Error("Failed to fetch fuel stations");
      }
      const data = await response.json();
      setFuelStations(data || []);
    } catch (error) {
      console.error("Error fetching fuel stations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch fuel stations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/fuel-stations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Fuel station deleted successfully",
        });
        fetchFuelStations();
      } else {
        throw new Error("Failed to delete fuel station");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete fuel station",
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
            <TableHead>Merchant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Known Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Woreda</TableHead>
            <TableHead>Kebele</TableHead>
            <TableHead>Region ID</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Company ID</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Coordinates</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fuelStations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={15} className="text-center">
                No fuel stations found
              </TableCell>
            </TableRow>
          ) : (
            fuelStations.map((station) => (
              <TableRow key={station.id}>
                <TableCell className="font-medium">{station.merchantId}</TableCell>
                <TableCell>{station.name}</TableCell>
                <TableCell>{station.known_name || "-"}</TableCell>
                <TableCell>{station.city}</TableCell>
                <TableCell>{station.zone}</TableCell>
                <TableCell>{station.woreda}</TableCell>
                <TableCell>{station.kebele}</TableCell>
                <TableCell>{station.regionId}</TableCell>
                <TableCell>{station.region?.name || "N/A"}</TableCell>
                <TableCell>{station.fuelCompanyId}</TableCell>
                <TableCell>{station.fuelCompany?.name || "N/A"}</TableCell>
                <TableCell>
                  {station.latitude && station.longitude
                    ? `${station.latitude.toFixed(4)}, ${station.longitude.toFixed(4)}`
                    : "-"}
                </TableCell>
                <TableCell>{new Date(station.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(station.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
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
                            This action cannot be undone. This will permanently delete the fuel station.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(station.id)}>
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