import { analyze } from "@/utils/ai"
import { getAuthUser } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

// app/api/entries/route.ts
export const GET = async () => {
    try {
        const user = await getAuthUser()
        const entries = await prisma.journalEntry.findMany({
            where: { userId: user.id },
            include: { analysis: true },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(entries)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch entries' },
            { status: 500 }
        )
    }
}

export const POST = async () => {
    try {
        const user = await getAuthUser()
        const newEntry = await prisma.journalEntry.create({
            data: { userId: user.id, content: '' }
        })

        const analysis = await analyze(newEntry.content)
        await prisma.analysis.create({
            data: { ...analysis, userId: user.id, entryId: newEntry.id }
        })

        return NextResponse.json({ id: newEntry.id })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create entry' },
            { status: 500 }
        )
    }
}