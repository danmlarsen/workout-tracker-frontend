import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      <Button asChild className="w-full">
        <Link href="/logout">Logout</Link>
      </Button>
    </div>
  );
}
