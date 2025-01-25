import { useMutation } from "@tanstack/react-query";

import { UserService } from "@/services/user";
import { queryClient } from "@/providers/react-query-provider";

interface UseDeleteUserOptions {
  onSuccess?: VoidFunction;
  onError?: (error: unknown) => void;
}

export function useDeleteUser({ onSuccess, onError }: UseDeleteUserOptions) {
  return useMutation({
    mutationFn: async (id: string) => {
      return await UserService.build().delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
    onError,
  });
}
