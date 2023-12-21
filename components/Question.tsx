"use client"

import { useState } from "react"

const Question = ()=> {
    const [search, setsearch] = useState('')
    const handlechange = (e)=> {
        setsearch(e.target.value);
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
    }
   return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            className="border border-black/20 px-4 py-2"
            type="text"
            placeholder="Ask a question"
            onChange={handlechange}
            />
            <button
            className="bg-blue-400 px-4 py-2 rounded-lg mx-2"
            >Search</button>
        </form>
    </div>
   )
}

export default Question;