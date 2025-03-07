import Entry from "@/components/Entry"
import { getAuthUser } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { analyze } from "@/utils/ai"

const getEntry = async (id: string) => {
    const user = await getAuthUser()
    const entry = await prisma.journalEntry.findUnique({
        where: { id },
        include: { analysis: true }
    })

    if (!entry || entry.userId !== user.id) {
        throw new Error('Entry not found')
    }

    return entry
}

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id)

    // Server action for updating entry
    const updateEntry = async ({ id, content }: { id: string, content: string }) => {
        'use server'

        try {
            const user = await getAuthUser()

            const updatedEntry = await prisma.journalEntry.update({
                where: {
                    id
                },
                data: { content },
            })

            const analysis = await analyze(updatedEntry.content)

            const updatedAnalysis = await prisma.analysis.upsert({
                where: { entryId: id },
                create: {
                    userId: user.id,
                    entryId: id,
                    ...analysis,
                },
                update: analysis,
            })

            return { ...updatedEntry, analysis: updatedAnalysis }
        } catch (error) {
            console.error('Error updating entry:', error)
            throw error
        }
    }

    return (
        <div className="h-screen w-full bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-sm h-[calc(100vh-48px)] border border-gray-700">
                <Entry entry={entry} updateEntry={updateEntry} />
            </div>
        </div>
    )
}

export default EntryPage