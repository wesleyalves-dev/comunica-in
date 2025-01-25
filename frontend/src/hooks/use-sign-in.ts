import { useMutation } from "@tanstack/react-query";

import { AuthService, type SignInInput } from "@/services/auth";

interface UseSignInOptions {
  onSuccess?: VoidFunction;
  onError?: (error: unknown) => void;
}

export function useSignIn({ onSuccess, onError }: UseSignInOptions) {
  return useMutation({
    mutationFn: async (input: SignInInput) => {
      return await AuthService.build().signIn(input);
    },
    onSuccess,
    onError,
  });
}
