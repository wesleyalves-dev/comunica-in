import { useMutation } from "@tanstack/react-query";

import { UserService, type UpdateUserInput } from "@/services/user";
import { queryClient } from "@/providers/react-query-provider";

interface UseUpdateUserOptions {
  onSuccess?: VoidFunction;
  onError?: (error: unknown) => void;
}

interface Variables {
  id: string;
  input: UpdateUserInput;
}

export function useUpdateUser({ onSuccess, onError }: UseUpdateUserOptions) {
  return useMutation({
    mutationFn: async (variables: Variables) => {
      const { id, input } = variables;
      return await UserService.build().update(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
    onError,
  });
}
