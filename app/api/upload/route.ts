import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { auth } from '@/auth';
import { processContractUpload } from '@/trigger/processContractUpload'
import {PutObjectCommand} from "@aws-sdk/client-s3";
import s3client from "@/lib/s3";

export async function POST(request: Request) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({
            success: false,
            message: "No file uploaded."
        }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const key = `contracts/${uuidv4()}-${file.name}`;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type || 'application/pdf'
    });

    try{
        await s3client.send(command);

    }catch (error){
        console.error("Error uploading file to S3:", error);

    }

    const contract = await prisma.contract.create({
        data: {
            id: uuidv4(),
            userId: session.user.id,
            fileName: file.name,
            filePath: key,  // store the S3 key instead of the local path
            status: "uploaded",
        }
    })

    // Trigger background processing task to process the uploaded contract
    await processContractUpload.trigger({
        contractId: contract.id,
    });

    return NextResponse.json({
        success: true,
        message: "File uploaded successfully."
    }, { status: 200 });
}