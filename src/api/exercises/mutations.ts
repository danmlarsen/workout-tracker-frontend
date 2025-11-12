import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../client";
import { type ExerciseData, type CreateExerciseDto } from "./types";

export const useCreateExercise = () => {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExerciseDto) =>
      apiClient<ExerciseData>("/exercises", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};
