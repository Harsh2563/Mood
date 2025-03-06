import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const createNewUser = async () => {
  try {
    const user = await currentUser()
    console.log("User is", user)

    if (!user) {
      console.error('No authenticated user found')
      redirect('/sign-in')
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (existingUser) {
      return existingUser
    }

    const email = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress

    if (!email) {
      throw new Error('No email address found for user')
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: email,
        // // username: user.username || `user_${Math.random().toString(36).substr(2, 9)}`,
        // firstName: user.firstName,
        // lastName: user.lastName,
      },
    })

    return newUser
  } catch (error) {
    console.error('Error in createNewUser:', error)
    throw error
  }
}

const NewUser = async () => {
  await createNewUser()
  redirect('/journal')
}

export default NewUser