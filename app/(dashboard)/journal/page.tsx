import EntryCard from "@/components/EntryCard";
import NewEntry from "@/components/NewEntry";
import Question from "@/components/Question";
import { prisma } from "@/utils/db";
import { analyze } from "@/utils/ai";
import { getAuthUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const JournalPage = async () => {
    const user = await getAuthUser();

    // Server action for creating new entry
    const createNewEntry = async () => {
        "use server";

        try {
            const newEntry = await prisma.journalEntry.create({
                data: {
                    userId: user.id,
                    content: "",
                },
            });

            // Create initial analysis
            const analysis = await analyze(newEntry.content);

            await prisma.analysis.create({
                data: {
                    userId: user.id,
                    entryId: newEntry.id,
                    ...analysis,
                },
            });

            return { id: newEntry.id.toString() };
        } catch (error) {
            console.error("Error creating new entry:", error);
            throw error;
        }
    };

    const entries = await prisma.journalEntry.findMany({
        where: { userId: user.id },
        include: { analysis: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-6 bg-slate-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-100">Your Journal</h2>
                    <div className="text-slate-400 text-sm">
                        {entries.length} entries this month
                    </div>
                </div>

                <div className="mb-12">
                    <Question />
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
    );
};

export default JournalPage;