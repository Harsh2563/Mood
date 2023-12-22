'use client'

import { newEntry } from '../utils/api'
import { useRouter } from 'next/navigation'

const NewEntry = () => {
  const router = useRouter()

  const handleClick = async () => {
    const data = await newEntry()    
    router.push(`/journal/${data.id}`)
  }
   return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white/80">
      <div className="px-4 py-5 sm:p-6 items-center" onClick={handleClick}>
         <span className="text-3xl">New Entry</span>
      </div>
    </div>
   )
}

export default NewEntry;