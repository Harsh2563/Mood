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
    
    const analysisData = [{name:'Summary', value:entry?.analysis?.summary},
                         {name: 'Subject', value:entry?.analysis?.subject},
                         {name: 'Mood', value:entry?.analysis?.mood},
                         {name: 'Negative', value:entry?.analysis?.negative? 'True':'False'}]
    return (
        <div className="h-full w-full grid grid-cols-3 bg-white">
            <div className="col-span-2">
            <Entry entry={entry}/>
            </div>
            <div className="border-l border-black/10">
                <div className="px-6 py-10" style={{backgroundColor: entry?.analysis?.color}}>
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                <ul>
                        {analysisData.map((item)=> (
                            <li key={item.name}
                            className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                                <span className="text-lg font-semibold">{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default EntryPage