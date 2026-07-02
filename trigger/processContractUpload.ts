import { task } from "@trigger.dev/sdk/v3";
import { logger } from "@trigger.dev/sdk/v3";
import { prisma } from "@/lib/prisma";
import {readFile} from "fs/promises";
import {extractTextFromPDF} from "@/lib/pdf-parser";
import { splitContractClauses } from "@/trigger/splitContractClauses";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3client from "@/lib/s3";

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
      // Download the file from S3
      const response = await s3client.send(new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: contract.filePath,  // this should be the S3 key stored in the database
      }));
      
      if(!response.Body) {
        throw new Error("Failed to download file from S3");
      }

      const chunk : Uint8Array[] = [];

      for await (const c of response.Body as AsyncIterable<Uint8Array>) {
        chunk.push(c);
      }

      const buffer = Buffer.concat(chunk);

      const text = await extractTextFromPDF(buffer);
      
      await prisma.contract.update({
        where: { id: contractId },
        data: {
          extractedText: text,
          status: "processed",
        },
      });

      logger.info("Contract processed successfully", {
        contractId,
      });
      console.log("Contract processed successfully", {
        contractId,
      });
      console.log(text);
      // Trigger clause splitting as a separate task

      await splitContractClauses.trigger({
        contractId
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