'use server';

import { prisma } from "@/lib/prisma";

type UpdateClauseReviewParams = {
  clauseId: string;
  reviewStatus: "APPROVED" | "REJECTED" | "PENDING";
  reviewNote: string;
};

export async function updateClauseReview(updateParams: UpdateClauseReviewParams) {
  const { clauseId, reviewStatus, reviewNote } = updateParams;
  await prisma.clause.update({
    where: { id: clauseId },
    data: {
      reviewStatus,
      reviewNote,
      reviewedAt: new Date(),
    },
  });
}