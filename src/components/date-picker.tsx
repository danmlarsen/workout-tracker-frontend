"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./ui/workout-calendar";
import { useWorkoutCalendar } from "@/api/workouts/queries";

export default function DatePicker({
  date,
  onDateChanged,
}: {
  date: Date;
  onDateChanged: (date: Date) => void;
}) {
  const [open, setOpen] = useState(false);

  const currentDate = date || new Date();

  const { data: calendarData } = useWorkoutCalendar(currentDate.getFullYear());

  const workoutDates = calendarData
    ? calendarData.workoutDates.map((str) => new Date(str))
    : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker"
          className="max-w-sm justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (date) {
              onDateChanged(date);
            }
            setOpen(false);
          }}
          modifiers={{
            workout: workoutDates,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
