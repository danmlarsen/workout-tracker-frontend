'use client';

import { useDeleteWorkout } from '@/api/workouts/mutations';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function WorkoutHistoryItemDropdownMenu({ workoutId }: { workoutId: number }) {
  const { mutate: deleteWorkout } = useDeleteWorkout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit Workout</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant="ghost" onClick={() => deleteWorkout(workoutId)}>
            Delete Workout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
