/*
  Warnings:

  - You are about to drop the column `isAdopted` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "isAdopted",
ADD COLUMN     "is_adopted" BOOLEAN NOT NULL DEFAULT false;
