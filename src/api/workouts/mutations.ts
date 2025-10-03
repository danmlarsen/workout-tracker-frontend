import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  type TWorkoutSetDto,
  type TUpdateWorkoutDto,
  type TWorkout,
} from "./types";

export function useCreateActiveWorkout() {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<TWorkout>("/workouts/active", {
        method: "POST",
      }),
    onSuccess: (newWorkout) => {
      queryClient.setQueryData(["workouts", "activeWorkout"], newWorkout);
    },
  });
}

export function useCompleteWorkout() {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutId: number) =>
      apiClient<TWorkout>(`/workouts/${workoutId}/complete`, {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.setQueryData(["workouts", "activeWorkout"], null);
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}

export function useUpdateWorkout() {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workoutId,
      data,
    }: {
      workoutId: number;
      data: TUpdateWorkoutDto;
    }) =>
      apiClient<TWorkout>(`/workouts/${workoutId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}

export function useDeleteWorkout() {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutId: number) =>
      apiClient<TWorkout>(`/workouts/${workoutId}`, {
        method: "DELETE",
      }),
    onSuccess: (_, workoutId) => {
      queryClient.removeQueries({ queryKey: ["workouts", workoutId] });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}

export function useAddWorkoutExercise() {
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
      apiClient<void>(`/workouts/${workoutId}/workoutExercises`, {
        method: "POST",
        body: JSON.stringify({
          exerciseId,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}

export function useAddWorkoutSet() {
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
      apiClient<void>(
        `/workouts/${workoutId}/workoutExercises/${workoutExerciseId}/sets`,
        {
          method: "POST",
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}

export function useUpdateWorkoutSet() {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workoutId,
      workoutExerciseId,
      setId,
      data,
    }: {
      workoutId: number;
      workoutExerciseId: number;
      setId: number;
      data: TWorkoutSetDto;
    }) =>
      apiClient<void>(
        `/workouts/${workoutId}/workoutExercises/${workoutExerciseId}/sets/${setId}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts"],
      });
    },
  });
}
