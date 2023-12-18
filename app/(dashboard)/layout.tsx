import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({children})=> {
    return(
        <div className="h-screen w-screen">
            <div className="flex">
                <div className="border-2 h-screen">
                    Mood
                </div>
                <div className="border-2 h-screen w-screen">
                    <div className="h-24 border-y-2">
                        Hello
                        <span className="absolute right-4 top-4">
                        <UserButton />
                        </span>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;