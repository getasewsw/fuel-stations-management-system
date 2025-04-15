-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FuelType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FuelType" ("code", "createdAt", "id", "name", "updatedAt") SELECT "code", "createdAt", "id", "name", "updatedAt" FROM "FuelType";
DROP TABLE "FuelType";
ALTER TABLE "new_FuelType" RENAME TO "FuelType";
CREATE UNIQUE INDEX "FuelType_code_key" ON "FuelType"("code");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "id", "image", "name", "password", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_fuel_company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_fuel_company" ("code", "createdAt", "id", "name", "updatedAt") SELECT "code", "createdAt", "id", "name", "updatedAt" FROM "fuel_company";
DROP TABLE "fuel_company";
ALTER TABLE "new_fuel_company" RENAME TO "fuel_company";
CREATE UNIQUE INDEX "fuel_company_code_key" ON "fuel_company"("code");
CREATE TABLE "new_region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_region" ("code", "createdAt", "id", "name", "updatedAt") SELECT "code", "createdAt", "id", "name", "updatedAt" FROM "region";
DROP TABLE "region";
ALTER TABLE "new_region" RENAME TO "region";
CREATE UNIQUE INDEX "region_code_key" ON "region"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
