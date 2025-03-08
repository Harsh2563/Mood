import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { HomeIcon, BookOpenIcon, ClockIcon } from "@heroicons/react/24/outline";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const links = [
        { href: '/', label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
        { href: '/journal', label: "Journal", icon: <BookOpenIcon className="w-6 h-6" /> },
        { href: '/history', label: "History", icon: <ClockIcon className="w-6 h-6" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-900">
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-slate-800 px-4 py-6 fixed left-0 top-0 h-full border-r border-slate-700">
                    <div className="mb-8 px-4">
                        <h1 className="text-2xl font-bold text-emerald-400">MoodTracker</h1>
                        <p className="text-sm text-slate-400">Emotional Analytics</p>
                    </div>

                    <nav>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg transition-all hover:bg-slate-700/50 hover:text-white"
                                    >
                                        {link.icon}
                                        <span className="text-sm font-medium">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="ml-64 flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-slate-800 py-4 px-6 flex items-center justify-between border-b border-slate-700">
                        <div className="text-slate-300">
                            <span className="text-lg font-semibold">Welcome Back</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-10 h-10 ring-2 ring-emerald-500",
                                        userButtonPopoverCard: "bg-slate-800 border border-slate-700",
                                    }
                                }}
                            />
                        </div>
                    </header>

                    {/* Content Area */}
                    <main className="flex-1 p-6 bg-slate-900">
                        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 min-h-full shadow-xl">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;