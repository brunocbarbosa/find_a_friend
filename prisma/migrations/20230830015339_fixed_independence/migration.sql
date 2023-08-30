/*
  Warnings:

  - You are about to drop the column `inependence` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "inependence",
ADD COLUMN     "independence" "Independence" NOT NULL DEFAULT 'low';
