'use client'

import { useState } from "react"
import { Loader2 } from "lucide-react"

const Question = ({ askQuestion }) => {
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            setIsLoading(true);
            setError('');
            const response = await askQuestion(query);
            setAnswer(response);
            setQuery('');
        } catch (err) {
            setError('Failed to get answer. Please try again.');
            console.error("Question error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    disabled={isLoading}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex-1 
                           text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 
                           focus:ring-emerald-500 focus:border-transparent transition-all"
                    type="text"
                    placeholder="Ask a question about your mood..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    disabled={isLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg 
                            text-slate-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed
                            transition-colors flex items-center gap-2"
                    type="submit"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : 'Ask'}
                </button>
            </form>

            {isLoading && (
                <div className="text-slate-400 flex items-center gap-2 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing your entries...
                </div>
            )}

            {error && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {answer && (
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 animate-in fade-in">
                    <h3 className="text-emerald-400 font-medium mb-2">Insight:</h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{answer}</p>
                </div>
            )}
        </div>
    )
}

export default Question