"use client";

import { useWorkoutCalendar } from "@/api/workouts/queries";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function WorkoutCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const currentDate = selectedDate || new Date();

  const { data: calendarData } = useWorkoutCalendar(currentDate.getFullYear());

  const workoutDates = calendarData
    ? calendarData.workoutDates.map((str) => new Date(str))
    : [];

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      modifiers={{
        workout: workoutDates,
      }}
      className="w-full rounded-md border shadow-sm"
      captionLayout="dropdown"
    />
  );
}
