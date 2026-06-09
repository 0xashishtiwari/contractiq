/*
  Warnings:

  - The `riskLevel` column on the `Clause` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Clause" DROP COLUMN "riskLevel",
ADD COLUMN     "riskLevel" "RiskLevel" NOT NULL DEFAULT 'LOW';
