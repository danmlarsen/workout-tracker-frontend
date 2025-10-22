"use client";

import { useExercise } from "@/api/exercises/queries";
import ExerciseWorkoutsList from "./exercise-workouts-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExerciseDetails({
  exerciseId,
}: {
  exerciseId: number;
}) {
  const { data } = useExercise(exerciseId);

  return (
    <div className="space-y-4">
      {data && <p className="text-center text-xl">{data.name}</p>}

      <Tabs defaultValue="workouts">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
        </TabsList>
        <TabsContent value="workouts">
          {data && <ExerciseWorkoutsList exerciseId={data.id} />}
        </TabsContent>
        <TabsContent value="charts">Charts</TabsContent>
        <TabsContent value="records">Records</TabsContent>
      </Tabs>
    </div>
  );
}
