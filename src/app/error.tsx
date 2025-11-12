"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h2 className="font-bold">Something went wrong!</h2>
          <p className="text-sm">Please try again later.</p>
        </div>
        <Link href="/" className="underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
