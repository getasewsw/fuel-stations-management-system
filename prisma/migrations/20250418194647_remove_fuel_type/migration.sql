/*
  Warnings:

  - You are about to drop the column `fuelTypeId` on the `fuel_price` table. All the data in the column will be lost.
  - You are about to drop the `FuelType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fuel_price" DROP CONSTRAINT "fuel_price_fuelTypeId_fkey";

-- AlterTable
ALTER TABLE "fuel_price" DROP COLUMN "fuelTypeId";

-- DropTable
DROP TABLE "FuelType";
