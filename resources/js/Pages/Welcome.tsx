import {Link, Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import {motion} from "framer-motion";
import {HeroHighlight, Highlight} from "@/Components/ui/hero-highlight";
import React from "react";
import {TypewriterEffectSmooth} from "@/Components/ui/write-effect";
import {WobbleCard} from "@/Components/ui/wobble-card";
import {WobbleCardDemo} from "@/Components/WobbleCard";

export default function Welcome({auth, laravelVersion, phpVersion}: PageProps<{
    laravelVersion: string,
    phpVersion: string
}>) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const words = [
        {
            text: "Create",
        },
        {
            text: "Your",
        },
        {
            text: "Mock REST APIs",
            className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: "with Ease!",
        },
    ];

    return (
        <>
            <Head title="Welcome"/>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div
                    className="relative min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>

                                        <Link href={route('login')}
                                              className="px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">
                                            Login
                                        </Link>

                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-12">
                            <div className="flex flex-col items-center justify-start mb-6">

                                <TypewriterEffectSmooth words={words}/>

                                <div
                                    className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                                    <button
                                        className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                                        Join now
                                    </button>
                                    <Link href={route('register')}
                                          className="px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">
                                        Signup
                                    </Link>
                                </div>
                            </div>

                            <WobbleCardDemo />
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
