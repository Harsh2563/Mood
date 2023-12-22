import { ques } from "@/utils/ai";
import { getUserFromClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async(request)=> {
   const {question} = await request.json();
   const user = await getUserFromClerkId()
   const entries = await prisma.journalEntry.findMany({
    where:{
        userId: user.id,
    },
    select: {
        createdAt: true,
        content: true,
        id:true,
    }
   })

   const result = await ques(question,entries);
   return NextResponse.json({data:result })
}