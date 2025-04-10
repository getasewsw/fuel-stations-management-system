/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `address` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Station` table. All the data in the column will be lost.
  - Added the required column `fuel_company_id` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kebele` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchant_id` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specific_location` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `woreda` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Comment";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "merchant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "kebele" TEXT NOT NULL,
    "specific_location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "region_id" TEXT NOT NULL,
    "fuel_company_id" TEXT NOT NULL,
    "known_name" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "gasoline_price" REAL,
    "gasoil_price" REAL,
    "kerosene_price" REAL,
    "lfo_price" REAL,
    "hfo_price" REAL
);
INSERT INTO "new_Station" ("city", "id", "name") SELECT "city", "id", "name" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
