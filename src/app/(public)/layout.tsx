import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LandingLayoutProps {
  children?: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <header className="border-foreground/10 bg-card fixed inset-x-0 top-0 grid min-h-24 border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between p-4 md:p-6">
          <Logo className="h-8 w-auto sm:h-10" />
          <div className="flex gap-2 sm:gap-4">
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid min-h-dvh max-w-5xl grid-rows-[1fr_auto] pt-24">
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
    </>
  );
}
