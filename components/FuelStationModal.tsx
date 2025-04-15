"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FuelStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  station?: {
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
  };
}

interface Region {
  id: number;
  name: string;
}

interface FuelCompany {
  id: number;
  name: string;
}

export default function FuelStationModal({
  isOpen,
  onClose,
  onSuccess,
  station,
}: FuelStationModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [regions, setRegions] = useState<Region[]>([]);
  const [fuelCompanies, setFuelCompanies] = useState<FuelCompany[]>([]);
  const [formData, setFormData] = useState({
    merchantId: station?.merchantId || "",
    name: station?.name || "",
    zone: station?.zone || "",
    woreda: station?.woreda || "",
    kebele: station?.kebele || "",
    city: station?.city || "",
    regionId: station?.regionId || "",
    fuelCompanyId: station?.fuelCompanyId || "",
    known_name: station?.known_name || "",
    latitude: station?.latitude || "",
    longitude: station?.longitude || "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchRegionsAndCompanies();
    }
  }, [isOpen]);

  const fetchRegionsAndCompanies = async () => {
    try {
      const [regionsRes, companiesRes] = await Promise.all([
        fetch("/api/regions"),
        fetch("/api/fuel-companies"),
      ]);

      if (!regionsRes.ok || !companiesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [regionsData, companiesData] = await Promise.all([
        regionsRes.json(),
        companiesRes.json(),
      ]);

      setRegions(regionsData);
      setFuelCompanies(companiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch regions and companies",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = station
        ? `/api/fuel-stations/${station.id}`
        : "/api/fuel-stations";
      const method = station ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          regionId: Number(formData.regionId),
          fuelCompanyId: Number(formData.fuelCompanyId),
          latitude: formData.latitude ? Number(formData.latitude) : null,
          longitude: formData.longitude ? Number(formData.longitude) : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save fuel station");
      }

      toast({
        title: "Success",
        description: station
          ? "Fuel station updated successfully"
          : "Fuel station created successfully",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving fuel station:", error);
      toast({
        title: "Error",
        description: "Failed to save fuel station",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {station ? "Edit Fuel Station" : "Add New Fuel Station"}
          </DialogTitle>
          <DialogDescription>
            {station
              ? "Update the fuel station details below."
              : "Fill in the details to add a new fuel station."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="merchantId">Merchant ID</Label>
              <Input
                id="merchantId"
                value={formData.merchantId}
                onChange={(e) =>
                  setFormData({ ...formData, merchantId: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Station Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zone">Zone</Label>
              <Input
                id="zone"
                value={formData.zone}
                onChange={(e) =>
                  setFormData({ ...formData, zone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="woreda">Woreda</Label>
              <Input
                id="woreda"
                value={formData.woreda}
                onChange={(e) =>
                  setFormData({ ...formData, woreda: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kebele">Kebele</Label>
              <Input
                id="kebele"
                value={formData.kebele}
                onChange={(e) =>
                  setFormData({ ...formData, kebele: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regionId">Region</Label>
              <Select
                value={formData.regionId.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, regionId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id.toString()}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fuelCompanyId">Fuel Company</Label>
              <Select
                value={formData.fuelCompanyId.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, fuelCompanyId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {fuelCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="known_name">Known Name</Label>
              <Input
                id="known_name"
                value={formData.known_name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, known_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude || ""}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude || ""}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : station ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 