"use client";

import { useWorkoutWeeklyStats } from "@/api/workouts/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber, formatNumber, formatWeight } from "@/lib/utils";
import { endOfWeek, startOfWeek } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import WeeklyReportButton from "./weekly-report-button";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeeklyReportStats() {
  const now = new Date();
  const from = startOfWeek(now, { weekStartsOn: 1 });
  const to = endOfWeek(now, { weekStartsOn: 1 });

  const { data, isFetching, isSuccess } = useWorkoutWeeklyStats(from, to);

  if (isFetching) {
    return <Skeleton className="h-[175px] rounded-xl" />;
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar1Icon size={16} />
          <span>
            {from.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {to.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </CardTitle>
        <WeeklyReportButton />
      </CardHeader>
      {isSuccess && (
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
