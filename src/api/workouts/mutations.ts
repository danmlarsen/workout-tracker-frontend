import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  type TWorkoutSetDto,
  type TUpdateWorkoutDto,
  type TWorkout,
  TUpdateWorkoutExerciseDto,
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
      queryClient.setQueryData(["activeWorkout"], newWorkout);
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
      queryClient.setQueryData(["activeWorkout"], null);
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}

export function useDeleteActiveWorkout() {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<TWorkout>("/workouts/active", {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.setQueryData(["activeWorkout"], null);
    },
  });
}

export function useUpdateWorkout(isActiveWorkout?: boolean) {
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
      if (isActiveWorkout) {
        queryClient.invalidateQueries({
          queryKey: ["activeWorkout"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["workouts"],
        });
      }
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
      apiClient<void>(`/workouts/${workoutId}/workoutExercises`, {
        method: "POST",
        body: JSON.stringify({
          exerciseId,
        }),
      }),
    onSuccess: () => {
      if (isActiveWorkout) {
        queryClient.invalidateQueries({
          queryKey: ["activeWorkout"],
        });
      } else {
        queryClient.invalidateQueries({
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
      apiClient<void>(
        `/workouts/${workoutId}/workoutExercises/${workoutExerciseId}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
        },
      ),
    onSuccess: () => {
      if (isActiveWorkout) {
        queryClient.invalidateQueries({
          queryKey: ["activeWorkout"],
        });
      } else {
        queryClient.invalidateQueries({
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
      apiClient<void>(
        `/workouts/${workoutId}/workoutExercises/${workoutExerciseId}`,
        {
          method: "DELETE",
        },
      ),
    onSuccess: () => {
      if (isActiveWorkout) {
        queryClient.invalidateQueries({
          queryKey: ["activeWorkout"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["workouts"],
        });
      }
    },
  });
}

export function useAddWorkoutSet(isActiveWorkout?: boolean) {
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
      if (isActiveWorkout) {
        queryClient.invalidateQueries({
          queryKey: ["activeWorkout"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["workouts"],
        });
      }
    },
  });
}

export function useUpdateWorkoutSet(isActiveWorkout?: boolean) {
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
      if (isActiveWorkout) {
        queryClient.invalidateQueries({
          queryKey: ["activeWorkout"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["workouts"],
        });
      }
    },
  });
}

export function usePauseActiveWorkout() {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<TWorkout>(`/workouts/active/pause`, {
        method: "PATCH",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activeWorkout"],
      });
    },
  });
}

export function useResumeActiveWorkout() {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<TWorkout>(`/workouts/active/resume`, {
        method: "PATCH",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activeWorkout"],
      });
    },
  });
}
