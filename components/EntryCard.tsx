// components/EntryCard.tsx
import { memo } from 'react'
import { JournalEntry } from '@prisma/client'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface EntryCardProps {
  entry: JournalEntry & { analysis?: any }
}

const EntryCard = memo(({ entry }: EntryCardProps) => {
  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-emerald-500/30 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <time className="text-sm text-slate-400">{date}</time>
        <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
          {entry.analysis?.mood || 'Neutral'}
        </span>
      </div>
      <h3 className="text-slate-200 font-medium mb-2 line-clamp-1">
        {entry.analysis?.subject || 'Untitled Entry'}
      </h3>
      <p className="text-slate-400 text-sm line-clamp-3">
        {entry.analysis?.summary || 'No summary available'}
      </p>
      <div className="mt-4 border-t border-slate-700 pt-3">
        <button className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2">
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  )
})

EntryCard.displayName = 'EntryCard'
export default EntryCard