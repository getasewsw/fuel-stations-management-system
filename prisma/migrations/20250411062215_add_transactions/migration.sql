/*
  Warnings:

  - You are about to drop the column `fuel_station_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_date` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `price` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `station_id` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "station_id" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "price" REAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'IN',
    "fuel_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "transaction_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "fuel_station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("amount", "created_at", "fuel_type", "id", "updated_at") SELECT "amount", "created_at", "fuel_type", "id", "updated_at" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
