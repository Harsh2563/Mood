// components/ui/skeleton.tsx
'use client'

import { cn } from '@/lib/utils' // Ensure you have a cn utility for class merging

export const Skeleton = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                'animate-pulse rounded-lg bg-slate-800/50',
                className
            )}
            {...props}
        />
    )
}