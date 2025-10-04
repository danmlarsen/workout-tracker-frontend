"use client";

import { useWorkoutStats } from "@/api/workouts/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber, formatNumber, formatWeight } from "@/lib/utils";
import { ClockIcon } from "lucide-react";

export default function LifetimeWorkoutsStats() {
  const { data } = useWorkoutStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClockIcon size={16} />
          <span>Lifetime Workouts</span>
        </CardTitle>
      </CardHeader>
      {data && (
        <CardContent className="grid grid-cols-3 text-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-bold">
              {formatNumber(data.totalWorkouts)}
            </p>
            <p className="text-muted-foreground">Workouts</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-bold">
              {formatCompactNumber(data.totalHours)}
            </p>
            <p className="text-muted-foreground">Hours</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="relative text-3xl font-bold">
              {formatWeight(data.totalWeightLifted)}{" "}
              <span className="text-muted-foreground absolute top-0 -right-5 text-sm font-light">
                kg
              </span>
            </p>
            <p className="text-muted-foreground">Lifted</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
