import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { ques } from '@/utils/ai'

export async function POST(req: NextRequest) {
    try {
        const user = await getAuthUser()
        const { question } = await req.json()

        const entries = await prisma.journalEntry.findMany({
            where: { userId: user.id },
            select: { content: true, createdAt: true, id: true },
            orderBy: { createdAt: 'desc' },
        })

        const answer = await ques(question, entries)
        return NextResponse.json({ answer })
    } catch (error) {
        console.error('ques route error:', error)
        return new NextResponse('Error processing question', { status: 500 })
    }
}
