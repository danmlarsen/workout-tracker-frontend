import { TWorkout } from '@/api/workouts/types';
import { useEffect, useState } from 'react';

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function Timer({ workout: { createdAt } }: { workout: TWorkout }) {
  const pauseDuration = 0;
  const isPaused = false;

  const [elapsedTime, setElapsedTime] = useState(0);

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

  return <div>{formatTime(elapsedTime)}</div>;
}
