'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"


const Entry = ({entry})=> {
    const [content, setcontent] = useState(entry.content)
    const [loading, setloading] = useState(false)
    useAutosave({
        data: content,
        onSave: async (v)=> {
            setloading(true)
            const updated = await updateEntry(entry.id,v);
            setloading(false);
        }
    })
   return (
    <div className="h-full w-full">
        {loading && (<div>....loading</div>)}
       <textarea 
       className="w-full h-full p-8 text-xl  outline-none"
       value={content}
       onChange={(e)=> setcontent(e.target.value)}
       ></textarea>
    </div>
   )
} 

export default Entry;