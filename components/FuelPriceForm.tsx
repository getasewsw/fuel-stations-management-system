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
  fuelStationId: z.string().min(1, "Station is required"),
  gasolinePrice: z.string().optional(),
  gasoilPrice: z.string().optional(),
  lfoPrice: z.string().optional(),
  hfoPrice: z.string().optional(),
  kerosenePrice: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

interface FuelStation {
  id: number;
  name: string;
}

interface FuelPriceFormProps {
  id?: number;
  onSuccess: () => void;
}

export default function FuelPriceForm({ id, onSuccess }: FuelPriceFormProps) {
  const [stations, setStations] = useState<FuelStation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fuelStationId: "",
      gasolinePrice: "",
      gasoilPrice: "",
      lfoPrice: "",
      hfoPrice: "",
      kerosenePrice: "",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    fetchStations();
    if (id) {
      fetchFuelPrice();
    }
  }, [id]);

  const fetchStations = async () => {
    try {
      const response = await fetch("/api/fuel-stations");
      if (!response.ok) {
        throw new Error("Failed to fetch stations");
      }
      const data = await response.json();
      setStations(data || []);
    } catch (error) {
      console.error("Error fetching stations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch stations",
        variant: "destructive",
      });
    }
  };

  const fetchFuelPrice = async () => {
    try {
      const response = await fetch(`/api/fuel-prices/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch fuel price");
      }
      const data = await response.json();
      form.reset({
        fuelStationId: data.fuelStationId.toString(),
        gasolinePrice: data.gasolinePrice?.toString() || "",
        gasoilPrice: data.gasoilPrice?.toString() || "",
        lfoPrice: data.lfoPrice?.toString() || "",
        hfoPrice: data.hfoPrice?.toString() || "",
        kerosenePrice: data.kerosenePrice?.toString() || "",
        startDate: data.startDate?.split("T")[0] || "",
        endDate: data.endDate?.split("T")[0] || "",
      });
    } catch (error) {
      console.error("Error fetching fuel price:", error);
      toast({
        title: "Error",
        description: "Failed to fetch fuel price",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const data = {
        fuelStationId: parseInt(values.fuelStationId),
        gasolinePrice: values.gasolinePrice ? parseFloat(values.gasolinePrice) : null,
        gasoilPrice: values.gasoilPrice ? parseFloat(values.gasoilPrice) : null,
        lfoPrice: values.lfoPrice ? parseFloat(values.lfoPrice) : null,
        hfoPrice: values.hfoPrice ? parseFloat(values.hfoPrice) : null,
        kerosenePrice: values.kerosenePrice ? parseFloat(values.kerosenePrice) : null,
        startDate: values.startDate || null,
        endDate: values.endDate || null,
      };

      const response = await fetch(
        id ? `/api/fuel-prices/${id}` : "/api/fuel-prices",
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || (id ? "Failed to update fuel price" : "Failed to create fuel price"));
      }

      toast({
        title: "Success",
        description: id ? "Fuel price updated successfully" : "Fuel price created successfully",
      });

      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : (id ? "Failed to update fuel price" : "Failed to create fuel price"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fuelStationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Station</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a station" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stations.map((station) => (
                    <SelectItem key={station.id} value={station.id.toString()}>
                      {station.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gasolinePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gasoline Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gasoilPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gasoil Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lfoPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LFO Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hfoPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HFO Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kerosenePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kerosene Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : id ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
} 