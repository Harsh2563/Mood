// app/api/entries/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/utils/db"
import { getAuthUser } from "@/utils/auth"
import { analyze } from "@/utils/ai"

export const GET = async () => {
  try {
    const user = await getAuthUser()
    const entries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      include: { analysis: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export const POST = async () => {
  try {
    const user = await getAuthUser()
    const newEntry = await prisma.journalEntry.create({
      data: { userId: user.id, content: "" }
    })

    const analysis = await analyze(newEntry.content)
    await prisma.analysis.create({
      data: { ...analysis, userId: user.id, entryId: newEntry.id }
    })

    return NextResponse.json({ id: newEntry.id })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}