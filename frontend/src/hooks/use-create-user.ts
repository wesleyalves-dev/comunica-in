import { useMutation } from "@tanstack/react-query";

import { UserService, type CreateUserInput } from "@/services/user";
import { queryClient } from "@/providers/react-query-provider";

interface UseCreateUserOptions {
  onSuccess?: VoidFunction;
  onError?: (error: unknown) => void;
}

export function useCreateUser({ onSuccess, onError }: UseCreateUserOptions) {
  return useMutation({
    mutationFn: async (input: CreateUserInput) => {
      return await UserService.build().create(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
    onError,
  });
}
