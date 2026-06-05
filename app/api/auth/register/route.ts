import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignUpSchema } from "@/lib/validations/auth";

export async function POST(
  request: Request
): Promise<NextResponse> {
  const data = await request.json();

  const validatedData = SignUpSchema.safeParse(data);

  if (!validatedData.success) {
    return NextResponse.json(
      {
        success: false,
        message: validatedData.error.message,
      },
      { status: 400 }
    );
  }

  const { name, email, password } = validatedData.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        success: false,
        message: "User already exists",
      },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "User created successfully",
    },
    { status: 201 }
  );
}