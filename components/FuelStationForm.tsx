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
    known_name?: string;
    latitude?: number;
    longitude?: number;
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
    try {
      const url = initialData
        ? `/api/fuel-stations/${initialData.id}`
        : "/api/fuel-stations";
      const method = initialData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
        throw new Error("Failed to save fuel station");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save fuel station",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="merchantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Merchant ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter merchant ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter station name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter zone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="woreda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Woreda</FormLabel>
                <FormControl>
                  <Input placeholder="Enter woreda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kebele"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kebele</FormLabel>
                <FormControl>
                  <Input placeholder="Enter kebele" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="regionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regions.length > 0 ? (
                      regions.map((region) => (
                        <SelectItem key={region.id} value={region.id.toString()}>
                          {region.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-regions" disabled>
                        No regions available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelCompanyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Company</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fuelCompanies.length > 0 ? (
                      fuelCompanies.map((company) => (
                        <SelectItem key={company.id} value={company.id.toString()}>
                          {company.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-companies" disabled>
                        No companies available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="known_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Known Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter known name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude (Optional)</FormLabel>
                <FormControl>
                  <Input type="number" step="any" placeholder="Enter latitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude (Optional)</FormLabel>
                <FormControl>
                  <Input type="number" step="any" placeholder="Enter longitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          {initialData ? "Update Station" : "Create Station"}
        </Button>
      </form>
    </Form>
  );
} 