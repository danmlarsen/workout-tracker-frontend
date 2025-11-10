"use client";

import { ResponsiveModal } from "../ui/responsive-modal";
import ChangePasswordButton from "@/components/settings/change-password-button";
import ThemeToggle from "../theme-toggle";
import { Button } from "../ui/button";
import Link from "next/link";
import DeleteAccountButton from "@/components/settings/delete-account-button";
import { SettingsIcon } from "lucide-react";
import { useSearchParamState } from "@/hooks/use-search-param-state";

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useSearchParamState("settings");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-foreground hover:text-accent flex flex-col items-center justify-center gap-0 bg-transparent hover:bg-transparent lg:flex-row lg:gap-4 lg:px-4 lg:py-2"
      >
        <SettingsIcon className="size-5" />
        <span>Settings</span>
      </button>
      <ResponsiveModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <div className="space-y-4 px-4">
            <div className="flex min-h-12 items-center justify-between">
              <h1 className="text-xl font-bold">Settings</h1>
            </div>

            <ChangePasswordButton className="w-full" />
            <ThemeToggle />
            <Button asChild className="w-full">
              <Link href="/logout">Logout</Link>
            </Button>
            <DeleteAccountButton className="w-full" />
          </div>
        }
      />
    </>
  );
}
