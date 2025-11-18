import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LandingLayoutProps {
  children?: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="mx-auto grid min-h-dvh max-w-5xl grid-rows-[auto_1fr_auto]">
      <header className="flex items-center justify-between p-4">
        <Logo />
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="grid p-4">{children}</main>
      <footer className="flex items-center justify-end p-4">
        <p className="text-muted-foreground text-sm">
          Built by Dan Marius Larsen –{" "}
          <Link href="https://www.danmarius.no" className="underline">
            danmarius.no
          </Link>
        </p>
      </footer>
    </div>
  );
}
