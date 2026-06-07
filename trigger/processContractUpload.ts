import { task } from "@trigger.dev/sdk";
import { logger } from "@trigger.dev/sdk/v3";
import { prisma } from "@/lib/prisma";
import {readFile} from "fs/promises";
import {extractTextFromPDF} from "@/lib/pdf-parser";
import { splitContractClauses } from "@/trigger/splitContractClauses";

export const processContractUpload = task({
  id: "process-contract-upload",

  run: async (
    payload: { contractId: string }
  ) => {
    const { contractId } = payload;

    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract) {
      throw new Error(`Contract ${contractId} not found`);
    }

    await prisma.contract.update({
      where: { id: contractId },
      data: { status: "processing" },
    });

    try {
      const buffer = await readFile(contract.filePath);
      
      const text = await extractTextFromPDF(buffer);
      
      await prisma.contract.update({
        where: { id: contractId },
        data: {
          extractedText: text,
          status: "processed",
        },
      });

      await splitContractClauses.trigger({
        contractId
      });

      logger.info("Contract processed successfully", {
        contractId,
      });
    } catch (error) {
      await prisma.contract.update({
        where: { id: contractId },
        data: { status: "failed" },
      });

      throw error;
    }
  },
});