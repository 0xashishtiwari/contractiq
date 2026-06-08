/*
  Warnings:

  - You are about to drop the column `ambigiousTerms` on the `Clause` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Clause" DROP COLUMN "ambigiousTerms",
ADD COLUMN     "ambiguousTerms" TEXT;
