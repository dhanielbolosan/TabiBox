"use client"

import { useEffect, useState } from "react";
import { Button } from "./imports/button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

export const AppNavbar = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="absolute top-0 left-0 right-0 flex items-center justify-between h-16 z-50 border-b bg-gray-500 px-6">

            <div className="flex-1 flex justify-start text-white text-sm">
                <h1 className="text-white text-xl font-bold">TabiBox</h1>
            </div>

            <div className="flex-1 flex justify-center">
                <span>Title</span>
            </div>

            <div className="flex-1 flex justify-end">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:cursor-pointer rounded-full"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {mounted && theme === "dark" ? <SunIcon size={20} weight="fill" /> : <MoonIcon size={20} weight="fill" />}
                </Button>
            </div>

        </header>
    )
}