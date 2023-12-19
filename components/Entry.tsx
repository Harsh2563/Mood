'use client'

import { useState } from "react"


const Entry = ({entry})=> {
    const [content, setcontent] = useState(entry.content)
   return (
    <div className="h-full w-full">
       <textarea 
       className="w-full h-full p-8 text-xl  outline-none"
       value={content}
       onChange={(e)=> setcontent(e.target.value)}
       ></textarea>
    </div>
   )
} 

export default Entry;