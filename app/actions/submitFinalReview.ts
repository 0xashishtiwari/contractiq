'use server'

import { prisma } from "@/lib/prisma";
import {wait } from '@trigger.dev/sdk/v3';

export async function submitFinalReview(contractId: string) {
    const contract = await prisma.contract.findUnique({
        where: { id: contractId },
      
    });

    if (!contract?.reviewTokenId) {
        throw new Error("Review token missing");
    }

    // Perform final review submission logic here

    await wait.completeToken(contract.reviewTokenId  , {
        contractId,
        status : "COMPLETED"
    });

    return {
        success: true,
        message: "Review submitted successfully",
    }
}