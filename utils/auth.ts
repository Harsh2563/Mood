import { auth } from "@clerk/nextjs/server"
import { prisma } from "./db";


export const getUserFromClerkId = async () => {
    const { userId } = await auth();
    console.log("userid", userId);

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            clerkId: userId,
        }
    })
    return user;
}