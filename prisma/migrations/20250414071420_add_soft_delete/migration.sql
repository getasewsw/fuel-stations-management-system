/*
  Warnings:

  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "fuel_price" ADD COLUMN "deleted_at" DATETIME;

-- AlterTable
ALTER TABLE "fuel_station" ADD COLUMN "deleted_at" DATETIME;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "transaction";
PRAGMA foreign_keys=on;
