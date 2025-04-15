/*
  Warnings:

  - Added the required column `updatedAt` to the `fuel_company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `region` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FuelType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fuel_company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_fuel_company" ("code", "id", "name") SELECT "code", "id", "name" FROM "fuel_company";
DROP TABLE "fuel_company";
ALTER TABLE "new_fuel_company" RENAME TO "fuel_company";
CREATE UNIQUE INDEX "fuel_company_code_key" ON "fuel_company"("code");
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
    "fuelTypeId" INTEGER,
    CONSTRAINT "fuel_price_fuel_station_id_fkey" FOREIGN KEY ("fuel_station_id") REFERENCES "fuel_station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "fuel_price_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "FuelType" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_fuel_price" ("created_at", "end_date", "fuel_station_id", "gasoil_price", "gasoline_price", "hfo_price", "id", "is_deleted", "kerosene_price", "lfo_price", "start_date", "updated_at") SELECT "created_at", "end_date", "fuel_station_id", "gasoil_price", "gasoline_price", "hfo_price", "id", "is_deleted", "kerosene_price", "lfo_price", "start_date", "updated_at" FROM "fuel_price";
DROP TABLE "fuel_price";
ALTER TABLE "new_fuel_price" RENAME TO "fuel_price";
CREATE TABLE "new_region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_region" ("code", "id", "name") SELECT "code", "id", "name" FROM "region";
DROP TABLE "region";
ALTER TABLE "new_region" RENAME TO "region";
CREATE UNIQUE INDEX "region_code_key" ON "region"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FuelType_code_key" ON "FuelType"("code");
