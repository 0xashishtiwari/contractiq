import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { prisma } from "@/lib/prisma";
import { auth } from '@/auth';
import { processContractUpload } from '@/trigger/processContractUpload'
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

    const uploadDir = path.join(process.cwd(), "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, `${uuidv4()}-${file.name}`);
    await writeFile(filePath, buffer);

    const contract = await prisma.contract.create({
        data: {
            id: uuidv4(),
            userId: session.user.id,
            fileName: file.name,
            filePath: filePath,
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