// app/api/entries/[id]/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/utils/db"
import { getAuthUser } from "@/utils/auth"

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const user = await getAuthUser()

    // Delete analysis first
    await prisma.analysis.deleteMany({
        where: { entryId: params.id, userId: user.id }
    })

    // Then delete entry
    await prisma.journalEntry.delete({
        where: { id: params.id, userId: user.id }
    })

    return NextResponse.json({ success: true })
}