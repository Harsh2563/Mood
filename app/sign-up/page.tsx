'use client'
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

const SignUpPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700/30 p-6">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-slate-100 mb-2">
                            Create Account
                        </h1>
                        <p className="text-slate-400">
                            Start tracking your mood journey today
                        </p>
                    </div>

                    <SignUp
                        appearance={{
                            variables: {
                                colorPrimary: "#34d399",
                                colorText: "#e2e8f0",
                                colorTextSecondary: "#94a3b8",
                                colorBackground: "#1e293b",
                                colorInputBackground: "#0f172a",
                            },
                            elements: {
                                formButtonPrimary:
                                    "bg-emerald-600 hover:bg-emerald-700 transition-colors",
                                card: "shadow-none bg-transparent",
                                socialButtonsBlockButton:
                                    "border-slate-700 bg-slate-700 hover:bg-slate-600 text-white",
                                socialButtonsBlockButtonText: "text-sm font-medium",
                                socialButtonsBlockButtonArrow: "text-emerald-400",
                                dividerLine: "bg-slate-700",
                                formFieldInput:
                                    "bg-slate-800 border-slate-700 focus:border-emerald-500",
                                footerActionLink: "text-emerald-400 hover:text-emerald-300",
                                socialButtonsProviderIcon: "brightness-125",
                            },
                        }}
                        path="/sign-up"
                        routing="path"
                    />

                    <footer className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} MoodTracker. All rights reserved.
                        </p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;