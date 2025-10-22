import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../client";
import { type TExercise, type TCreateExerciseDto } from "./types";

export const useCreateExercise = () => {
  const { apiClient } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCreateExerciseDto) =>
      apiClient<TExercise>("/exercises", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};
