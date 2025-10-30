import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChangePasswordForm from "./change-password-form";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <ChangePasswordForm />
      <ThemeToggle />
      <Button asChild className="w-full">
        <Link href="/logout">Logout</Link>
      </Button>
      <Button variant="destructive" className="w-full">
        Delete account
      </Button>
    </div>
  );
}
