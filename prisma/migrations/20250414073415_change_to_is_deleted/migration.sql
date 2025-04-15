/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `fuel_price` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `fuel_station` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fuel_price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fuel_station_id" INTEGER NOT NULL,
    "gasoline_price" REAL,
    "gasoil_price" REAL,
    "lfo_price" REAL,
    "hfo_price" REAL,
    "kerosene_price" REAL,
    "start_date" DATETIME,
    "end_date" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "fuel_price_fuel_station_id_fkey" FOREIGN KEY ("fuel_station_id") REFERENCES "fuel_station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_fuel_price" ("created_at", "end_date", "fuel_station_id", "gasoil_price", "gasoline_price", "hfo_price", "id", "kerosene_price", "lfo_price", "start_date", "updated_at") SELECT "created_at", "end_date", "fuel_station_id", "gasoil_price", "gasoline_price", "hfo_price", "id", "kerosene_price", "lfo_price", "start_date", "updated_at" FROM "fuel_price";
DROP TABLE "fuel_price";
ALTER TABLE "new_fuel_price" RENAME TO "fuel_price";
CREATE TABLE "new_fuel_station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "merchant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "kebele" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,
    "fuel_company_id" INTEGER NOT NULL,
    "known_name" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "fuel_station_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "fuel_station_fuel_company_id_fkey" FOREIGN KEY ("fuel_company_id") REFERENCES "fuel_company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_fuel_station" ("city", "created_at", "fuel_company_id", "id", "kebele", "known_name", "latitude", "longitude", "merchant_id", "name", "region_id", "updated_at", "woreda", "zone") SELECT "city", "created_at", "fuel_company_id", "id", "kebele", "known_name", "latitude", "longitude", "merchant_id", "name", "region_id", "updated_at", "woreda", "zone" FROM "fuel_station";
DROP TABLE "fuel_station";
ALTER TABLE "new_fuel_station" RENAME TO "fuel_station";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
