'use client'

import { newEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const NewEntry = () => {
  const router = useRouter()

  const handleClick = async () => {
    const data = await newEntry()
    router.push(`/journal/${data.id}`)
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
                 hover:bg-slate-800/50"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center h-full gap-3 
                       text-slate-400 group-hover:text-emerald-400 transition-colors">
          <PlusCircleIcon className="w-12 h-12" />
          <span className="text-xl font-medium">New Entry</span>
        </div>
      </div>
    </motion.div>
  )
}

export default NewEntry