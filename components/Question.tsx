"use client"

import { askQues } from "@/utils/api"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const Question = () => {
    const [search, setsearch] = useState('')
    const [loading, setloading] = useState(false)
    const [answer, setanswer] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            const ans = await askQues(search)
            setanswer(ans);
            setsearch('')
        } catch (error) {
            console.error("Error in handleSubmit ", error);
        } finally {
            setloading(false);
        }
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    disabled={loading}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex-1 
                           text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 
                           focus:ring-emerald-500 focus:border-transparent transition-all"
                    type="text"
                    placeholder="Ask a question about your mood..."
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                />
                <button
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg 
                            text-slate-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed
                            transition-colors flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : 'Ask'}
                </button>
            </form>

            {loading && (
                <div className="text-slate-400 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing your question...
                </div>
            )}

            {answer && (
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <h3 className="text-emerald-400 font-medium mb-2">Insight:</h3>
                    <p className="text-slate-300 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    )
}

export default Question;