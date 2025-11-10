"use client";

import { useWorkoutLifetimeStats } from "@/api/workouts/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCompactNumber, formatNumber, formatWeight } from "@/lib/utils";
import { ClockIcon } from "lucide-react";

export default function LifetimeWorkoutsStats() {
  const { data, isLoading, isSuccess, isError } = useWorkoutLifetimeStats();

  if (isLoading) {
    return <Skeleton className="h-[150px] rounded-xl" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClockIcon className="size-4 lg:size-6" />
          <span>Lifetime Workouts</span>
        </CardTitle>
      </CardHeader>
      {isSuccess && (
        <CardContent className="grid grid-cols-3 text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-3xl font-bold lg:text-4xl">
              {formatNumber(data.totalWorkouts)}
            </p>
            <p className="text-muted-foreground">Workouts</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-3xl font-bold lg:text-4xl">
              {formatCompactNumber(data.totalHours)}
            </p>
            <p className="text-muted-foreground">Hours</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="relative text-3xl font-bold lg:text-4xl">
              {formatWeight(data.totalWeightLifted)}{" "}
              <span className="text-muted-foreground absolute top-0 -right-5 text-sm font-light">
                kg
              </span>
            </p>
            <p className="text-muted-foreground">Lifted</p>
          </div>
        </CardContent>
      )}
      {isError && (
        <CardContent>
          <p className="text-destructive text-center">
            Failed to load lifetime workout stats.
          </p>
        </CardContent>
      )}
    </Card>
  );
}
