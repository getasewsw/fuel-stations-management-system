"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FuelPriceForm from "@/components/FuelPriceForm";

interface FuelPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
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
}

export default function FuelPriceModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: FuelPriceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Fuel Price" : "Add New Fuel Price"}
          </DialogTitle>
        </DialogHeader>
        <FuelPriceForm
          initialData={initialData}
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
} 