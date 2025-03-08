// app/(dashboard)/journal/page.tsx
import { cache } from 'react'
import Link from "next/link"
import { prisma } from "@/utils/db"
import { analyze, analyzeQuestion } from "@/utils/ai"
import { getAuthUser } from "@/utils/auth"
import { redirect } from "next/navigation"
import EntryCard from "@/components/EntryCard"
import NewEntry from "@/components/NewEntry"
import Question from "@/components/Question"

const getEntries = cache(async (userId: string) => {
    return await prisma.journalEntry.findMany({
        where: { userId },
        include: { analysis: true },
        orderBy: { createdAt: "desc" },
    })
})

const JournalPage = async () => {
    const user = await getAuthUser()

    // Server Actions
    const createNewEntry = async () => {
        "use server"
        try {
            const newEntry = await prisma.journalEntry.create({
                data: { userId: user.id, content: "" }
            })

            const analysis = await analyze(newEntry.content)
            await prisma.analysis.create({
                data: { ...analysis, userId: user.id, entryId: newEntry.id }
            })

            return { id: newEntry.id.toString() }
        } catch (error) {
            console.error("Entry creation failed:", error)
            throw error
        }
    }

    const handleQuestion = async (question: string) => {
        "use server"
        try {
            const entries = await prisma.journalEntry.findMany({
                where: { userId: user.id },
                select: { content: true, createdAt: true, id: true },
                orderBy: { createdAt: "desc" }
            })
            return await analyzeQuestion(question, entries)
        } catch (error) {
            console.error("Question processing failed:", error)
            return "Unable to process your question at this time"
        }
    }

    const entries = await getEntries(user.id)

    return (
        <div className="p-6 bg-slate-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-100">Journal Entries</h1>
                    <span className="text-slate-400 text-sm">
                        {entries.length} entries this month
                    </span>
                </header>

                <div className="mb-12">
                    <Question askQuestion={handleQuestion} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewEntry createEntry={createNewEntry} />
                    {entries.map((entry) => (
                        <Link key={entry.id} href={`/journal/${entry.id}`}>
                            <EntryCard entry={entry} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default JournalPage