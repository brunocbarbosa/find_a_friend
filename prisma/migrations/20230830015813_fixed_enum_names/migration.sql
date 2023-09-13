/*
  Warnings:

  - The values [low,medium,high] on the enum `Energy` will be removed. If these variants are still used in the database, this will fail.
  - The values [low,medium,high] on the enum `Independence` will be removed. If these variants are still used in the database, this will fail.
  - The values [small,medium,big] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Energy_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "Pet" ALTER COLUMN "energy" DROP DEFAULT;
ALTER TABLE "Pet" ALTER COLUMN "energy" TYPE "Energy_new" USING ("energy"::text::"Energy_new");
ALTER TYPE "Energy" RENAME TO "Energy_old";
ALTER TYPE "Energy_new" RENAME TO "Energy";
DROP TYPE "Energy_old";
ALTER TABLE "Pet" ALTER COLUMN "energy" SET DEFAULT 'LOW';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Independence_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "Pet" ALTER COLUMN "independence" DROP DEFAULT;
ALTER TABLE "Pet" ALTER COLUMN "independence" TYPE "Independence_new" USING ("independence"::text::"Independence_new");
ALTER TYPE "Independence" RENAME TO "Independence_old";
ALTER TYPE "Independence_new" RENAME TO "Independence";
DROP TYPE "Independence_old";
ALTER TABLE "Pet" ALTER COLUMN "independence" SET DEFAULT 'LOW';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('SMALL', 'MEDIUM', 'BIG');
ALTER TABLE "Pet" ALTER COLUMN "size" DROP DEFAULT;
ALTER TABLE "Pet" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
ALTER TABLE "Pet" ALTER COLUMN "size" SET DEFAULT 'SMALL';
COMMIT;

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "size" SET DEFAULT 'SMALL',
ALTER COLUMN "energy" SET DEFAULT 'LOW',
ALTER COLUMN "independence" SET DEFAULT 'LOW';
