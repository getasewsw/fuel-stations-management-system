"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface FuelStationsImportExportProps {
  onImportSuccess?: () => void;
}

export default function FuelStationsImportExport({
  onImportSuccess,
}: FuelStationsImportExportProps) {
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      const response = await fetch("/api/fuel-stations/export");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to export fuel stations");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fuel-stations.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Success",
        description: "Fuel stations exported successfully",
      });
    } catch (error) {
      console.error("Error exporting fuel stations:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to export fuel stations",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Error",
        description: "Please select a CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/fuel-stations/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to import fuel stations");
      }

      toast({
        title: "Success",
        description: "Fuel stations imported successfully",
      });

      onImportSuccess?.();
    } catch (error) {
      console.error("Error importing fuel stations:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to import fuel stations",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      // Reset the input value to allow importing the same file again
      event.target.value = "";
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={isImporting}
      >
        <Download className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
      <div className="relative">
        <Input
          type="file"
          accept=".csv"
          onChange={handleImport}
          disabled={isImporting}
          className="hidden"
          id="import-file"
        />
        <Button
          variant="outline"
          size="sm"
          disabled={isImporting}
          onClick={() => document.getElementById("import-file")?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isImporting ? "Importing..." : "Import CSV"}
        </Button>
      </div>
    </div>
  );
} 