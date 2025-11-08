import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../client";
import { TUpdateWorkoutExerciseDto, TWorkout } from "./types";

export function useAddWorkoutExercise(isActiveWorkout?: boolean) {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workoutId,
      exerciseId,
    }: {
      workoutId: number;
      exerciseId: number;
    }) =>
      apiClient<TWorkout>(`/workouts/${workoutId}/workoutExercises`, {
        method: "POST",
        body: JSON.stringify({
          exerciseId,
        }),
      }),
    onSuccess: async (updatedWorkout, vars) => {
      if (isActiveWorkout) {
        queryClient.setQueryData(["activeWorkout"], updatedWorkout);
      } else {
        queryClient.setQueryData(
          ["workout", { id: vars.workoutId }],
          updatedWorkout,
        );
        await queryClient.invalidateQueries({
          queryKey: ["workouts"],
        });
      }
    },
  });
}

export function useUpdateWorkoutExercise(isActiveWorkout?: boolean) {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workoutId,
      workoutExerciseId,
      data,
    }: {
      workoutId: number;
      workoutExerciseId: number;
      data: TUpdateWorkoutExerciseDto;
    }) =>
      apiClient<TWorkout>(
        `/workouts/${workoutId}/workoutExercises/${workoutExerciseId}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
        },
      ),
    onSuccess: async (updatedWorkout, vars) => {
      if (isActiveWorkout) {
        queryClient.setQueryData(["activeWorkout"], updatedWorkout);
      } else {
        queryClient.setQueryData(
          ["workout", { id: vars.workoutId }],
          updatedWorkout,
        );
        await queryClient.invalidateQueries({
          queryKey: ["workouts"],
        });
      }
    },
  });
}

export function useDeleteWorkoutExercise(isActiveWorkout?: boolean) {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workoutId,
      workoutExerciseId,
    }: {
      workoutId: number;
      workoutExerciseId: number;
    }) =>
      apiClient<TWorkout>(
        `/workouts/${workoutId}/workoutExercises/${workoutExerciseId}`,
        {
          method: "DELETE",
        },
      ),
    onSuccess: async (updatedWorkout, vars) => {
      if (isActiveWorkout) {
        queryClient.setQueryData(["activeWorkout"], updatedWorkout);
      } else {
        queryClient.setQueryData(
          ["workout", { id: vars.workoutId }],
          updatedWorkout,
        );
        await queryClient.invalidateQueries({
          queryKey: ["workouts"],
        });
      }
    },
  });
}
