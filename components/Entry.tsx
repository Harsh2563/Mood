'use client'

import { useState } from "react"
import { useAutosave } from "react-autosave"

const Entry = ({ entry, updateEntry }) => {
    const [content, setContent] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)

    const analysisData = [
        { name: 'Summary', value: analysis?.summary },
        { name: 'Subject', value: analysis?.subject },
        { name: 'Mood', value: analysis?.mood },
        { name: 'Negative', value: analysis?.negative ? 'Yes' : 'No' }
    ]

    useAutosave({
        data: content,
        onSave: async (content) => {
            if (content !== entry.content) {
                setIsLoading(true)
                try {
                    const data = await updateEntry({ id: entry.id, content })
                    setAnalysis(data.analysis)
                } finally {
                    setIsLoading(false)
                }
            }
        }
    })

    return (
        <div className="h-full w-full flex flex-col md:flex-row gap-6 bg-gray-900">
            <div className="flex-1 relative p-4">
                <div className="absolute top-6 right-6">
                    {isLoading && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <svg className="animate-spin h-4 w-4 text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Saving...
                        </div>
                    )}
                </div>
                <textarea
                    className="w-full h-full p-6 text-lg font-light rounded-lg border border-gray-700 
                             bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 
                             resize-none placeholder-gray-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your entry..."
                />
            </div>

            <div className="md:w-96 bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
                <div className="p-6 bg-opacity-50" style={{ backgroundColor: analysis?.color ? `${analysis.color}40` : '#1f2937' }}>
                    <h2 className="text-2xl font-bold text-gray-100">Entry Analysis</h2>
                </div>

                <div className="p-6">
                    <dl className="space-y-4">
                        {analysisData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between border-b border-gray-700 pb-2">
                                <dt className="text-sm font-medium text-gray-400">{item.name}</dt>
                                <dd className="text-md font-semibold text-gray-200 text-right 
                                             break-words max-w-[200px]">
                                    {item.value || 'N/A'}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Entry