'use client'
import EntryCard from "@/components/EntryCard";
import NewEntry from "@/components/NewEntry";
import Question from "@/components/Question";
import { motion } from "framer-motion";
import Link from "next/link";

const JournalPage = async () => {
    // const entries = await getEntries();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-slate-900 min-h-screen"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-100">Your Journal</h2>
                    <div className="text-slate-400 text-sm">
                        {/* {entries?.length} entries this month */}
                    </div>
                </div>

                <div className="mb-12">
                    <Question />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewEntry />
                    {/* {entries.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/journal/${entry.id}`}>
                                <EntryCard 
                                    entry={entry} 
                                    className="hover:border-emerald-400/30 transition-colors"
                                />
                            </Link>
                        </motion.div>
                    ))} */}
                </div>
            </div>
        </motion.div>
    )
}

export default JournalPage;