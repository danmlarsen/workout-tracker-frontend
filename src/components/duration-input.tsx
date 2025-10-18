"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { formatTime } from "@/lib/utils";
import { Input } from "./ui/input";
import { TWorkout } from "@/api/workouts/types";

function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function timeStringToSeconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export default function DurationInput({
  workout,
  onDurationChanged,
}: {
  workout: TWorkout;
  onDurationChanged: (duration: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(() =>
    workout.completedAt && workout.startedAt
      ? Math.floor(
          (new Date(workout.completedAt).getTime() -
            new Date(workout.startedAt).getTime()) /
            1000,
        )
      : 0,
  );

  function handleOpenChange(open: boolean) {
    if (!open) {
      onDurationChanged(duration);
    }
    setOpen(open);
  }

  function handleDurationChange(newDuration: string) {
    const parsedDuration = timeStringToSeconds(newDuration);
    setDuration(parsedDuration);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button>{formatTime(duration * 1000)}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Label htmlFor="time-picker">Duration</Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={secondsToTimeString(duration)}
          onChange={(e) => handleDurationChange(e.target.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
