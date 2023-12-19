import EntryCard from "@/components/EntryCard";
import NewEntry from "@/components/NewEntry";
import { getUserFromClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

const getEntries = async()=> {
    const user = await getUserFromClerkId();
    const entries = await prisma.journalEntry.findMany({
        where:{
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return entries
}

const JournalPage = async()=> {
    const entries = await getEntries();
    console.log('entries',entries);
    
    return(
        <div className="p-8">
            <h2 className="text-3xl mb-8">Your Journals</h2>
        <div className="grid grid-cols-3 gap-4">
            <NewEntry />
            {entries.map((entry)=> (
                <Link key={entry.id} href={`/journal/${entry.id}`}>
                <EntryCard entry={entry} />
                </Link> 
            ))}
        </div>
        </div>
    )
}

export default JournalPage;