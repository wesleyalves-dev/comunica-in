import { useQuery } from "@tanstack/react-query";

import { SwPersonService, type ListSwPeopleParams } from "@/services/sw-person";

export function useListSwPeople(params: ListSwPeopleParams = {}) {
  const { page } = params;

  return useQuery({
    queryKey: ["sw-people", page],
    queryFn: async () => {
      return await SwPersonService.build().list({ page });
    },
  });
}
