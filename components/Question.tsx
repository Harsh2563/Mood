"use client"

import { askQues } from "@/utils/api"
import { useState } from "react"

const Question = ()=> {
    const [search, setsearch] = useState('')
    const [loading, setloading] = useState(false)
    const [answer, setanswer] = useState()
    const handlechange = (e)=> {
        setsearch(e.target.value);
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        try {
            setloading(true);
            const ans = await askQues(search)
            console.log("Here is the answer to the question ",ans);
            
            setanswer(ans);
            setsearch('')
            setloading(false);
            
        } catch (error) {
            console.log("Error in handleSubmit ", error);
            setloading(false);
            return;  
        }

    }
   return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            disabled={loading}
            className="border border-black/20 px-4 py-2"
            type="text"
            placeholder="Ask a question"
            onChange={handlechange}
            />
            <button
            disabled={loading}
            className="bg-blue-400 px-4 py-2 rounded-lg mx-2"
            >Search</button>
        </form>
        {loading && (
            <div>...loading</div>
        )}
        {answer && (
            <div>{answer}</div>
        )}
    </div>
   )
}

export default Question;