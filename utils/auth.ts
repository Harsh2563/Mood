import { currentUser } from '@clerk/nextjs/server'
import { prisma } from './db'
import { redirect } from 'next/navigation'

export const getAuthUser = async () => {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) redirect('/sign-in')

        const user = await prisma.user.upsert({
            where: { clerkId: clerkUser.id },
            update: {},
            create: {
                clerkId: clerkUser.id,
                email: clerkUser.emailAddresses.find(
                    e => e.id === clerkUser.primaryEmailAddressId
                )?.emailAddress || 'no-email@example.com',
            },
        })

        return user
    } catch (error) {
        console.error('Error in getAuthUser:', error)
        redirect('/sign-in')
    }
}