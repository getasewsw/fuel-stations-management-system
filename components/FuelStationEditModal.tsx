"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FuelStationForm from "@/components/FuelStationForm";
import { useToast } from "@/components/ui/use-toast";

interface FuelStationEditModalProps {
  station: {
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
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function FuelStationEditModal({
  station,
  isOpen,
  onClose,
  onSuccess,
}: FuelStationEditModalProps) {
  const { toast } = useToast();

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <DialogHeader className="space-y-2 pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            Edit Fuel Station
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Make changes to the fuel station details below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <FuelStationForm
            initialData={station}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 