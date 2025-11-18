import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="grid items-center">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-7xl font-medium">
          Track your workouts.
          <br />
          See your progress.
        </h1>
        <p className="text-muted-foreground max-w-md">
          NextLift is a fast, distraction-free workout tracker that makes it
          easy to log sets, follow your plan, and see your progress over time.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo">Try demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
