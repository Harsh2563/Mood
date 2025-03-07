'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const NewEntry = ({ createEntry }: { createEntry: () => Promise<any> }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const data = await createEntry()
      router.push(`/journal/${data.id}`)
    } catch (error) {
      console.error("Failed to create entry:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer group"
    >
      <div
        className="h-full bg-slate-800 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed 
                 border-slate-700 hover:border-emerald-400/50 transition-all duration-300
                 hover:bg-slate-800/50 relative"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center h-full gap-3 
                       text-slate-400 group-hover:text-emerald-400 transition-colors">
          {isLoading ? (
            <svg
              className="w-12 h-12 animate-spin text-emerald-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <PlusCircleIcon className="w-12 h-12" />
          )}
          <span className="text-xl font-medium">
            {isLoading ? 'Creating...' : 'New Entry'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default NewEntry