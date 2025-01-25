import { useQuery } from "@tanstack/react-query";

import { UserService, type ListUsersParams } from "@/services/user";

export function useListUsers(params: ListUsersParams = {}) {
  const { page } = params;

  return useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      return await UserService.build().list({ page });
    },
  });
}
