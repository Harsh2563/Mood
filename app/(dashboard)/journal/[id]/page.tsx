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
        include: {
            analysis:true,
        }
    })
    return requiredEntry;
}

const EntryPage = async ({params})=> {

    const entry = await userEntry(params.id)
    
    
    return (
        <div className="h-full w-full bg-white">
            <Entry entry={entry}/>
        </div>
    )
}

export default EntryPage