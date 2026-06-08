-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Clause" ADD COLUMN     "ambigiousTerms" TEXT,
ADD COLUMN     "recommendations" TEXT,
ADD COLUMN     "riskExplanation" TEXT,
ADD COLUMN     "riskLevel" TEXT;
