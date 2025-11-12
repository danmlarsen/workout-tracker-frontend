import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex items-center">
        <h1 className="border-accent mr-4 border-r pr-4 text-xl font-bold">
          404
        </h1>
        <div className="text-sm">
          <h2>This page could not be found.</h2>
          <Link href="/" className="underline">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
