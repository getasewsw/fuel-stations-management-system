-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuel_station" (
    "id" SERIAL NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "kebele" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,
    "fuel_company_id" INTEGER NOT NULL,
    "known_name" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "fuel_station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuel_company" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuel_company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuel_price" (
    "id" SERIAL NOT NULL,
    "fuel_station_id" INTEGER NOT NULL,
    "gasoline_price" DOUBLE PRECISION,
    "gasoil_price" DOUBLE PRECISION,
    "lfo_price" DOUBLE PRECISION,
    "hfo_price" DOUBLE PRECISION,
    "kerosene_price" DOUBLE PRECISION,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "fuelTypeId" INTEGER,

    CONSTRAINT "fuel_price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuelType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FuelType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "region_code_key" ON "region"("code");

-- CreateIndex
CREATE UNIQUE INDEX "fuel_company_code_key" ON "fuel_company"("code");

-- CreateIndex
CREATE UNIQUE INDEX "FuelType_code_key" ON "FuelType"("code");

-- AddForeignKey
ALTER TABLE "fuel_station" ADD CONSTRAINT "fuel_station_fuel_company_id_fkey" FOREIGN KEY ("fuel_company_id") REFERENCES "fuel_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuel_station" ADD CONSTRAINT "fuel_station_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuel_price" ADD CONSTRAINT "fuel_price_fuel_station_id_fkey" FOREIGN KEY ("fuel_station_id") REFERENCES "fuel_station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuel_price" ADD CONSTRAINT "fuel_price_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "FuelType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
