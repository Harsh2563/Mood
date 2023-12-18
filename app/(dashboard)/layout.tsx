import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({children})=> {
    return(
        <div className="h-screen w-screen">
            <div className="flex">
                <div className="border-2 h-screen">
                    Mood
                </div>
                <div className="border-1 h-screen w-screen flex flex-col bg-zinc-300/60">
                    <div className="h-24 border-y-2 bg-white">
                        Hello
                        <span className="absolute right-4 top-4">
                        <UserButton />
                        </span>
                    </div>
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;