import { getUserFromClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async()=> {
  const user = await getUserFromClerkId();
  console.log("user is",user);
  
  
  const entry = await prisma.journalEntry.create({
    data: {
        userId: user.id,
        content: 'New Entry fella',
    },
  })
  revalidatePath('/journal')
  return NextResponse.json({data: entry});
}

