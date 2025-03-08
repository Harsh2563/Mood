"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import EntryCard from "@/components/EntryCard";
import Question from "@/components/Question";
import NewEntry from "@/components/NewEntry";

export default function JournalPage() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    // Query for entries
    const {
        data: entries = [],
        isLoading,
        isError,
        isFetching,
    } = useQuery({
        queryKey: ["journal-entries"],
        queryFn: async () => {
            const res = await fetch("/api/entries");
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        },
        staleTime: 1000 * 60 * 5,
    });

    // Mutation for creating new entry
    const createMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/entries", { method: "POST" });
            if (!res.ok) throw new Error("Failed to create entry");
            return res.json();
        },
        onMutate: async () => {
            setIsCreating(true);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["journal-entries"]);
            router.push(`/journal/${data.id}`);
        },
        onError: () => {
            router.push("/journal");
        },
        onSettled: () => {
            setIsCreating(false);
        },
    });

    // Mutation for deleting an entry
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/entries/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            return id;
        },
        onMutate: async (deletedId) => {
            await queryClient.cancelQueries(["journal-entries"]);
            const previousEntries = queryClient.getQueryData<any[]>(["journal-entries"]);
            if (previousEntries) {
                queryClient.setQueryData<any[]>(
                    ["journal-entries"],
                    previousEntries.filter((entry) => entry.id !== deletedId)
                );
            }
            return { previousEntries };
        },
        onError: (error, deletedId, context) => {
            if (context?.previousEntries) {
                queryClient.setQueryData(["journal-entries"], context.previousEntries);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(["journal-entries"]);
        },
    });

    // Mutation for question
    const questionMutation = useMutation({
        mutationFn: async (query: string) => {
            const res = await fetch("/api/ques", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: query }),
            });
            if (!res.ok) throw new Error("Failed to process question");
            const data = await res.json();
            return data.answer;
        },
    });

    // Handler passed to <Question> that calls the questionMutation
    const askQuestion = async (query: string) => {
        return questionMutation.mutateAsync(query);
    };

    if (isLoading || isCreating) {
        return (
            <div className="p-6 bg-slate-900 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div className="animate-pulse h-9 w-48 bg-slate-800 rounded" />
                        <div className="animate-pulse h-5 w-24 bg-slate-800 rounded" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse h-48 bg-slate-800 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 bg-slate-900 min-h-screen flex items-center justify-center">
                <div className="text-center text-slate-300">
                    <div className="mb-4">Failed to load journal entries</div>
                    <button
                        onClick={() => queryClient.refetchQueries(["journal-entries"])}
                        className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-slate-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-100">Journal Entries</h1>
                    <div className="text-slate-400 text-sm flex items-center gap-2">
                        {(isFetching || questionMutation.isLoading) && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        <span>{entries.length} entries this month</span>
                    </div>
                </header>

                <div className="mb-12">
                    <Question askQuestion={askQuestion} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Suspense
                        fallback={
                            <div className="h-full bg-slate-800 rounded-xl p-6 animate-pulse" />
                        }
                    >
                        <NewEntry onCreate={createMutation.mutateAsync} />
                    </Suspense>

                    {entries.map((entry: any) => (
                        <EntryCard
                            key={entry.id}
                            entry={entry}
                            onDelete={deleteMutation.mutate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
