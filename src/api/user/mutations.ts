import { useMutation } from "@tanstack/react-query";

import { useApiClient } from "../client";

export function useDeleteAccount() {
  const { apiClient } = useApiClient();

  return useMutation({
    mutationFn: (password: string) =>
      apiClient<{ success: boolean; message?: string }>("/users/account", {
        method: "DELETE",
        body: JSON.stringify({ password }),
      }),
  });
}
