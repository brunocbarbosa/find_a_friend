-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'YOUNG', 'ADULT', 'OLD');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'big');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "Age" NOT NULL DEFAULT 'PUPPY',
    "size" "Size" NOT NULL DEFAULT 'small',
    "energy" "Energy" NOT NULL DEFAULT 'low',
    "inependence" "Independence" NOT NULL DEFAULT 'low',
    "requirement" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
