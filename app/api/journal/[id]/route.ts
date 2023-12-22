import { analyze } from "@/utils/ai";
import { getUserFromClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async(request,{params})=>{
    try {
        
       const {content} = await request.json();
       const user = await getUserFromClerkId();
       const updatedContent = await prisma.journalEntry.update({
        where:{
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content,
        }
       })

        const analysis = await analyze(updatedContent.content);
        await prisma.analysis.upsert({
            where: {
                entryId: updatedContent.id,
            },
            create: {
                userId: user.id,
                entryId: updatedContent.id,
                ...analysis,
            },
            update: analysis,
        })
       

       return NextResponse.json({data:{...updatedContent, analysis:analysis}})
    } catch (error) {
        console.log("route.ts error", error);
    }
}