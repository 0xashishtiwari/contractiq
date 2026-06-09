-- AlterTable
ALTER TABLE "Clause" ADD COLUMN     "reviewNote" TEXT,
ADD COLUMN     "reviewStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "reviewedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "report" JSONB,
ADD COLUMN     "reviewTokenId" TEXT;
