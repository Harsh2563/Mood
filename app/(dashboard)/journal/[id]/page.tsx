import Entry from "@/components/Entry"
import { getUserFromClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const userEntry = async(id)=> {
    const user = await getUserFromClerkId();
    const requiredEntry = await prisma.journalEntry.findUnique({
        where:{
            userId_id: {
                userId: user.id,
                id,
            },
        },
    })
    return requiredEntry;
}

const EntryPage = async ({params})=> {
    const entry = await userEntry(params.id)
    return (
        <div>
            <Entry entry={entry}/>
        </div>
    )
}

export default EntryPage