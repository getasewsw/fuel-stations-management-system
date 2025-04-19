"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  merchantId: z.string().min(1, "Merchant ID is required"),
  name: z.string().min(1, "Name is required"),
  zone: z.string().min(1, "Zone is required"),
  woreda: z.string().min(1, "Woreda is required"),
  kebele: z.string().min(1, "Kebele is required"),
  city: z.string().min(1, "City is required"),
  regionId: z.string().min(1, "Region is required"),
  fuelCompanyId: z.string().min(1, "Fuel Company is required"),
  known_name: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

interface Region {
  id: number;
  name: string;
}

interface FuelCompany {
  id: number;
  name: string;
}

interface FuelStationFormProps {
  initialData?: {
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
  onSuccess?: () => void;
}

export default function FuelStationForm({
  initialData,
  onSuccess,
}: FuelStationFormProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [fuelCompanies, setFuelCompanies] = useState<FuelCompany[]>([]);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      merchantId: initialData?.merchantId || "",
      name: initialData?.name || "",
      zone: initialData?.zone || "",
      woreda: initialData?.woreda || "",
      kebele: initialData?.kebele || "",
      city: initialData?.city || "",
      regionId: initialData?.regionId?.toString() || "",
      fuelCompanyId: initialData?.fuelCompanyId?.toString() || "",
      known_name: initialData?.known_name || "",
      latitude: initialData?.latitude?.toString() || "",
      longitude: initialData?.longitude?.toString() || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsResponse, companiesResponse] = await Promise.all([
          fetch("/api/regions"),
          fetch("/api/fuel-companies"),
        ]);

        if (!regionsResponse.ok || !companiesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const regionsData = await regionsResponse.json();
        const companiesData = await companiesResponse.json();

        console.log("Regions data:", regionsData);
        console.log("Companies data:", companiesData);

        // Ensure we have arrays even if the API returns an error object
        setRegions(Array.isArray(regionsData) ? regionsData : []);
        setFuelCompanies(Array.isArray(companiesData) ? companiesData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch regions and companies",
          variant: "destructive",
        });
        // Set empty arrays on error
        setRegions([]);
        setFuelCompanies([]);
      }
    };
    fetchData();
  }, [toast]);

  // Debug the current state
  useEffect(() => {
    console.log("Current regions:", regions);
    console.log("Current fuel companies:", fuelCompanies);
  }, [regions, fuelCompanies]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const url = initialData
        ? `/api/fuel-stations/${initialData.id}`
        : "/api/fuel-stations";
      const method = initialData ? "PUT" : "POST";

      // Transform the values to match the API expectations
      const transformedValues = {
        ...values,
        regionId: parseInt(values.regionId),
        fuelCompanyId: parseInt(values.fuelCompanyId),
        latitude: values.latitude ? parseFloat(values.latitude) : null,
        longitude: values.longitude ? parseFloat(values.longitude) : null,
      };

      console.log("Submitting form with values:", transformedValues);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedValues),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: initialData
            ? "Fuel station updated successfully"
            : "Fuel station created successfully",
        });
        onSuccess?.();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save fuel station");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save fuel station",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="merchantId"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Merchant ID
            </Label>
            <Input
              id="merchantId"
              value={form.watch("merchantId")}
              onChange={(e) => form.setValue("merchantId", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter merchant ID"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </Label>
            <Input
              id="name"
              value={form.watch("name")}
              onChange={(e) => form.setValue("name", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter station name"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="knownName"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Known Name
            </Label>
            <Input
              id="knownName"
              value={form.watch("known_name")}
              onChange={(e) => form.setValue("known_name", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter known name"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="zone"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Zone
            </Label>
            <Input
              id="zone"
              value={form.watch("zone")}
              onChange={(e) => form.setValue("zone", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter zone"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="woreda"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Woreda
            </Label>
            <Input
              id="woreda"
              value={form.watch("woreda")}
              onChange={(e) => form.setValue("woreda", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter woreda"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="kebele"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Kebele
            </Label>
            <Input
              id="kebele"
              value={form.watch("kebele")}
              onChange={(e) => form.setValue("kebele", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter kebele"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="city"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              City
            </Label>
            <Input
              id="city"
              value={form.watch("city")}
              onChange={(e) => form.setValue("city", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter city"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="regionId"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Region
            </Label>
            <Select
              value={form.watch("regionId")}
              onValueChange={(value) => form.setValue("regionId", value)}
            >
              <SelectTrigger className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                {regions.map((region) => (
                  <SelectItem
                    key={region.id}
                    value={region.id.toString()}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="companyId"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Company
            </Label>
            <Select
              value={form.watch("fuelCompanyId")}
              onValueChange={(value) => form.setValue("fuelCompanyId", value)}
            >
              <SelectTrigger className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                {fuelCompanies.map((company) => (
                  <SelectItem
                    key={company.id}
                    value={company.id.toString()}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="latitude"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Latitude
            </Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              value={form.watch("latitude")}
              onChange={(e) => form.setValue("latitude", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter latitude"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="longitude"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Longitude
            </Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              value={form.watch("longitude")}
              onChange={(e) => form.setValue("longitude", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter longitude"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => {}}
            size="sm"
            className="h-9 px-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            size="sm"
            className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
