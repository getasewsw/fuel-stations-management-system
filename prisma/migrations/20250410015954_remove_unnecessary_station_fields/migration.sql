/*
  Warnings:

  - You are about to drop the column `hfo_price` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `kebele` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `kerosene_price` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `known_name` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `lfo_price` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `specific_location` on the `Station` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "merchant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "region_id" TEXT NOT NULL,
    "fuel_company_id" TEXT NOT NULL,
    "gasoline_price" REAL,
    "gasoil_price" REAL
);
INSERT INTO "new_Station" ("city", "created_at", "fuel_company_id", "gasoil_price", "gasoline_price", "id", "merchant_id", "name", "region_id", "updated_at", "woreda", "zone") SELECT "city", "created_at", "fuel_company_id", "gasoil_price", "gasoline_price", "id", "merchant_id", "name", "region_id", "updated_at", "woreda", "zone" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
