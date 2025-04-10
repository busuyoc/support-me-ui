"use client"

// import { Tooltip, TooltipContent } from "@radix-ui/react-tooltip"; // this was causing the bug of the tooltip not looking like one
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip"; // forgot to import everything
import { Button } from "./button";
import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function LightDarkToggle({className}: {className?: string}) {
    const {setTheme, resolvedTheme} = useTheme() // Next hook -> uses JS so it needs to be converted into a client component (v. line 1)
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild className={className} onClick={() => {
                    setTheme(resolvedTheme === "light" ? "dark" : "light")
                }}>
                    <Button variant="outline">
                        <SunIcon className="block dark:hidden"/> 
                            {/* if in dark mode -> apply hidden */}
                        <MoonIcon className="hidden dark:block"/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span className="hidden dark:inline">Enable Light Mode</span>
                    <span className="inline dark:hidden">Enable Dark Mode</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}