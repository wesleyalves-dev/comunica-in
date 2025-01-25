import { useQuery } from "@tanstack/react-query";

import { UserService, type ListUsersParams } from "@/services/user";

export function useListUsers(params: ListUsersParams = {}) {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await UserService.build().list(params);
    },
  });
}
