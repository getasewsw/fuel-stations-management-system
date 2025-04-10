-- CreateTable
CREATE TABLE "transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fuel_station_id" INTEGER NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "unit_price" REAL NOT NULL,
    "total_price" REAL NOT NULL,
    "transaction_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "transaction_fuel_station_id_fkey" FOREIGN KEY ("fuel_station_id") REFERENCES "fuel_station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
