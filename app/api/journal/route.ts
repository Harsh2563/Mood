import { analyze } from "@/utils/ai";
import { getUserFromClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// 

export const POST = async (request) => {
  const { id } = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      clerkId: id,
    },
  })
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
  })
  return NextResponse.json({ data: entries })
}

