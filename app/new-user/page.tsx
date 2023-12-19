import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  try {
    const user = await currentUser()
    console.log(user)

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id as string,
      },
    })

    if (!existingUser) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        },
      })
    }

    redirect('/journal')
  } catch (error) {
    redirect('/journal')
  }
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser
