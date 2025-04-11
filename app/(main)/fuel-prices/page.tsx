"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FuelPricesTable from "@/components/FuelPricesTable";
import FuelPriceForm from "@/components/FuelPriceForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FuelPricesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingPrice(id);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fuel Prices</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Fuel Price
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPrice ? "Edit Fuel Price" : "Add New Fuel Price"}
              </DialogTitle>
            </DialogHeader>
            <FuelPriceForm
              id={editingPrice || undefined}
              onSuccess={() => {
                setIsDialogOpen(false);
                setEditingPrice(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <FuelPricesTable onEdit={handleEdit} />
    </div>
  );
} 