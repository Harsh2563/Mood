import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const DashboardLayout = ({children})=> {
    const links = [
        {href:'/', label:"Home"},
        {href: '/journal', label:"Journal"},
    ]
    return(
        <div className="h-screen w-screen">
            <div className="flex">
                <div className="border-2 h-screen">
                    <div className="text-xl">
                        Mood
                    </div>
                    <ul>
                        {links.map((link)=> (
                            <li key={link.href} className="px-2 py-6 text-xl">
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border-1 h-screen w-screen flex flex-col bg-zinc-300/60">
                    <div className="h-24 border-y-2 bg-white">
                        Hello
                        <span className="absolute right-4 top-4">
                        <UserButton />
                        </span>
                    </div>
                    <div className="h-full w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;