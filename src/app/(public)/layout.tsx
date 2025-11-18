import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LandingLayoutProps {
  children?: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="mx-auto grid min-h-dvh max-w-5xl grid-rows-[auto_1fr_auto]">
      <header className="flex items-center justify-between p-4 md:p-6">
        <Logo className="h-8 w-auto sm:h-10" />
        <div className="flex gap-2 sm:gap-4">
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </header>
      <main className="grid p-4 md:p-6">{children}</main>
      <footer className="flex items-center justify-center p-4 md:justify-end md:p-6">
        <p className="text-muted-foreground text-xs md:text-sm">
          In active development by –{" "}
          <Link
            href="https://www.danmarius.no"
            className="hover:text-foreground underline underline-offset-2 transition-colors duration-300"
            target="_blank"
          >
            danmarius.no
          </Link>
        </p>
      </footer>
    </div>
  );
}
