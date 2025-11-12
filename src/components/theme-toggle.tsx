"use client";

import { useTheme } from "next-themes";
import { CogIcon, MoonIcon, SunIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative w-full">
          <span>Toggle theme</span>
          <SunIcon className="absolute right-5 size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute right-5 size-[1.2rem] scale-0 -rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon />
          Light theme
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon />
          Dark theme
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <CogIcon />
          Use system default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
