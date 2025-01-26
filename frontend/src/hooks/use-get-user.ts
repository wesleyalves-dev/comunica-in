import { useQuery } from "@tanstack/react-query";

import { UserService } from "@/services/user";

export function useGetUser(id?: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) return null;
      return await UserService.build().get(id);
    },
  });
}
