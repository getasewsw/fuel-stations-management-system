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
  fuelStationId: z.string().min(1, "Fuel Station is required"),
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
  initialData?: {
    id: number;
    fuelStationId: number;
    gasolinePrice: number | null;
    gasoilPrice: number | null;
    lfoPrice: number | null;
    hfoPrice: number | null;
    kerosenePrice: number | null;
    startDate: string | null;
    endDate: string | null;
  };
  onSuccess?: () => void;
}

export default function FuelPriceForm({
  initialData,
  onSuccess,
}: FuelPriceFormProps) {
  const [fuelStations, setFuelStations] = useState<FuelStation[]>([]);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fuelStationId: initialData?.fuelStationId.toString() || "",
      gasolinePrice: initialData?.gasolinePrice?.toString() || "",
      gasoilPrice: initialData?.gasoilPrice?.toString() || "",
      lfoPrice: initialData?.lfoPrice?.toString() || "",
      hfoPrice: initialData?.hfoPrice?.toString() || "",
      kerosenePrice: initialData?.kerosenePrice?.toString() || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationsResponse = await fetch("/api/fuel-stations");
        
        if (!stationsResponse.ok) {
          throw new Error("Failed to fetch fuel stations");
        }

        const stationsData = await stationsResponse.json();
        setFuelStations(stationsData);
    } catch (error) {
        console.error("Error fetching data:", error);
      toast({
        title: "Error",
          description: "Failed to fetch fuel stations",
        variant: "destructive",
      });
    }
  };
    fetchData();
  }, [toast]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const url = initialData
        ? `/api/fuel-prices/${initialData.id}`
        : "/api/fuel-prices";
      const method = initialData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        fuelStationId: parseInt(values.fuelStationId),
        gasolinePrice: values.gasolinePrice ? parseFloat(values.gasolinePrice) : null,
        gasoilPrice: values.gasoilPrice ? parseFloat(values.gasoilPrice) : null,
        lfoPrice: values.lfoPrice ? parseFloat(values.lfoPrice) : null,
        hfoPrice: values.hfoPrice ? parseFloat(values.hfoPrice) : null,
        kerosenePrice: values.kerosenePrice ? parseFloat(values.kerosenePrice) : null,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: initialData
            ? "Fuel price updated successfully"
            : "Fuel price created successfully",
        });
        onSuccess?.();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save fuel price");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save fuel price",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fuelStationId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Fuel Station
            </Label>
            <Select
              value={form.watch("fuelStationId")}
              onValueChange={(value) => form.setValue("fuelStationId", value)}
            >
              <SelectTrigger className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                <SelectValue placeholder="Select fuel station" />
                  </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                {fuelStations.map((station) => (
                  <SelectItem 
                    key={station.id} 
                    value={station.id.toString()}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                      {station.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gasolinePrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gasoline Price
            </Label>
            <Input
              id="gasolinePrice"
              type="number"
              step="0.01"
              value={form.watch("gasolinePrice")}
              onChange={(e) => form.setValue("gasolinePrice", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter gasoline price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gasoilPrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gasoil Price
            </Label>
            <Input
              id="gasoilPrice"
              type="number"
              step="0.01"
              value={form.watch("gasoilPrice")}
              onChange={(e) => form.setValue("gasoilPrice", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter gasoil price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lfoPrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              LFO Price
            </Label>
            <Input
              id="lfoPrice"
              type="number"
              step="0.01"
              value={form.watch("lfoPrice")}
              onChange={(e) => form.setValue("lfoPrice", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter LFO price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hfoPrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              HFO Price
            </Label>
            <Input
              id="hfoPrice"
              type="number"
              step="0.01"
              value={form.watch("hfoPrice")}
              onChange={(e) => form.setValue("hfoPrice", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter HFO price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kerosenePrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Kerosene Price
            </Label>
            <Input
              id="kerosenePrice"
              type="number"
              step="0.01"
              value={form.watch("kerosenePrice")}
              onChange={(e) => form.setValue("kerosenePrice", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter kerosene price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={form.watch("startDate")}
              onChange={(e) => form.setValue("startDate", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={form.watch("endDate")}
              onChange={(e) => form.setValue("endDate", e.target.value)}
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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