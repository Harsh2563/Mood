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
       return NextResponse.json({data:updatedContent})
    } catch (error) {
        console.log("route.ts error", error);
    }
}