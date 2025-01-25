import { useQuery } from "@tanstack/react-query";

import { SwPersonService, type ListSwPeopleParams } from "@/services/sw-person";

export function useListSwPeople(params: ListSwPeopleParams = {}) {
  return useQuery({
    queryKey: ["sw-people"],
    queryFn: async () => {
      return await SwPersonService.build().list(params);
    },
  });
}
