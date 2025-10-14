import { TWorkout } from "@/api/workouts/types";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import {
  usePauseActiveWorkout,
  useResumeActiveWorkout,
} from "@/api/workouts/mutations";

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours ? `${hours.toString().padStart(2, "0")}:` : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function Timer({
  workout: { createdAt, pauseDuration, isPaused },
  isButton = false,
}: {
  workout: TWorkout;
  isButton?: boolean;
}) {
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
      const start = new Date(createdAt).getTime();
      const total = now - start - pauseDuration;
      return Math.max(0, total);
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
  }, [createdAt, isPaused, pauseDuration]);

  if (isButton) {
    return (
      <Button
        onClick={handleTogglePause}
        className="flex items-center justify-center gap-2"
        disabled={pauseWorkout.isPending || resumeWorkout.isPending}
      >
        {isPaused && <PlayIcon size={16} />}
        {!isPaused && <PauseIcon size={16} />}
        {formatTime(elapsedTime)}
      </Button>
    );
  }

  return <div>{formatTime(elapsedTime)}</div>;
}
