"use client";

import { useEffect, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { TWorkout } from "@/api/workouts/types";
import { Button } from "./button";
import {
  usePauseActiveWorkout,
  useResumeActiveWorkout,
} from "@/api/workouts/workout-mutations";
import { formatTimeFromMs } from "@/lib/utils";

interface TimerProps {
  workout: TWorkout;
  isButton?: boolean;
}

export default function Timer({
  workout: { startedAt, pauseDuration, isPaused, lastPauseStartTime },
  isButton = false,
}: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const pauseWorkout = usePauseActiveWorkout();
  const resumeWorkout = useResumeActiveWorkout();

  const handleTogglePause = () => {
    if (isPaused) {
      resumeWorkout.mutate();
    } else {
      pauseWorkout.mutate();
    }
  };

  useEffect(() => {
    const calculateElapsed = () => {
      const now = Date.now();
      const start = new Date(startedAt).getTime();

      if (isPaused && lastPauseStartTime) {
        // When paused, calculate time up to when pause started
        const pauseStart = new Date(lastPauseStartTime).getTime();
        return Math.max(0, pauseStart - start - pauseDuration);
      } else {
        // When running, calculate current elapsed time
        return Math.max(0, now - start - pauseDuration);
      }
    };

    setElapsedTime(calculateElapsed());

    let interval: NodeJS.Timeout | undefined;

    if (!isPaused) {
      interval = setInterval(() => {
        setElapsedTime(calculateElapsed());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startedAt, isPaused, pauseDuration, lastPauseStartTime]);

  if (isButton) {
    return (
      <Button
        onClick={handleTogglePause}
        className="flex items-center justify-center gap-2"
        disabled={pauseWorkout.isPending || resumeWorkout.isPending}
      >
        {isPaused && <PlayIcon size={16} />}
        {!isPaused && <PauseIcon size={16} />}
        {formatTimeFromMs(elapsedTime)}
      </Button>
    );
  }

  return <div>{formatTimeFromMs(elapsedTime)}</div>;
}
