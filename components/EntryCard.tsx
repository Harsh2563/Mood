'use client'
import { useState } from 'react'
import { JournalEntry } from '@prisma/client'
import { ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface EntryCardProps {
  entry: JournalEntry & { analysis?: any }
  onDelete: (id: string) => void
}

const EntryCard = ({ entry, onDelete }: EntryCardProps) => {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/journal/${entry.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete')
      onDelete(entry.id)
    } catch (error) {
      console.error('Delete failed:', error)
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-emerald-500/30 transition-colors relative">
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowDeleteModal(true)
        }}
        className="absolute top-3 right-3 p-1.5 text-red-400 hover:text-red-300 transition-colors z-10"
      >
        <TrashIcon className="w-5 h-5" />
      </button>

      <div className="flex justify-between items-center mb-3">
        <time className="text-sm text-slate-400">
          {new Date(entry.createdAt).toLocaleDateString()}
        </time>
        <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full mr-6">
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
        <Link href={`/journal/${entry.id}`} className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2">
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          View Details
        </Link>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Delete Entry
            </h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete this entry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-slate-300 hover:text-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="animate-spin">🌀</span>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EntryCard