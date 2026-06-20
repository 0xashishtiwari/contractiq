/*
  Warnings:

  - The `finalSummary` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "summaryGenerationRunId" TEXT,
DROP COLUMN "finalSummary",
ADD COLUMN     "finalSummary" JSONB;
