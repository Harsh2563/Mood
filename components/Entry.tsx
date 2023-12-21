'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"


const Entry = ({entry})=> {
    const [content, setcontent] = useState(entry.content)
    const [loading, setloading] = useState(false)
    const [analysis, setanalysis] = useState(entry.analysis)
    const analysisData = [{name:'Summary', value:analysis?.summary},
                         {name: 'Subject', value:analysis?.subject},
                         {name: 'Mood', value:analysis?.mood},
                         {name: 'Negative', value:analysis?.negative? 'True':'False'}]
    useAutosave({
        data: content,
        onSave: async (v)=> {
            setloading(true)
            const data = await updateEntry(entry.id,v);
            setanalysis(data.analysis)
            setloading(false);
        }
    })
   return (
    <div className="h-full w-full grid grid-cols-3">
        <div className="col-span-2" >
        {loading && (<div>....loading</div>)}
       <textarea 
       className="w-full h-full p-8 text-xl  outline-none"
       value={content}
       onChange={(e)=> setcontent(e.target.value)}
       ></textarea>
    </div>

<div className="border-l border-black/10">
<div className="px-6 py-10" style={{backgroundColor: analysis?.color}}>
    <h2 className="text-2xl">Analysis</h2>
</div>
<div>
<ul>
        {analysisData.map((item)=> (
            <li key={item.name}
            className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="w-48">{item.value}</span>
            </li>
        ))}
    </ul>
</div>
</div>
    </div>
   )
} 

export default Entry;