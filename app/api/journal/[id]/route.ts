import { NextResponse } from "next/server"
import { prisma } from "@/utils/db"
import { getAuthUser } from "@/utils/auth"

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const user = await getAuthUser()

    await prisma.analysis.deleteMany({
        where: { entryId: params.id, userId: user.id }
    })

    await prisma.journalEntry.delete({
        where: { id: params.id, userId: user.id }
    })

    return NextResponse.json({ success: true })
}