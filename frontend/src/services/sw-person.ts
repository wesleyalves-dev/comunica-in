import { api } from "./api";

export interface SwPersonRaw {
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string;
  mass: string;
  skinColor: string;
  created: string;
  edited: string;
}

export interface SwPerson extends SwPersonRaw {
  createdFormatted: string;
  editedFormatted: string;
}

export interface ListSwPeopleParams {
  page?: number;
}

export interface ListSwPeopleRawOutput {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwPersonRaw[];
}

export interface ListSwPeopleOutput {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwPerson[];
}

function formatSwPerson(raw: SwPersonRaw): SwPerson {
  return {
    ...raw,
    createdFormatted: new Date(raw.created).toLocaleString(),
    editedFormatted: new Date(raw.edited).toLocaleString(),
  };
}

export class SwPersonService {
  static build() {
    return new SwPersonService();
  }

  async list(params: ListSwPeopleParams): Promise<ListSwPeopleOutput> {
    const { page = 1 } = params;
    const response = await api.get<ListSwPeopleRawOutput>(`/swapi/people`, {
      params: { page },
    });
    const { count, next, previous, results } = response.data;
    return {
      count,
      next,
      previous,
      results: results.map(formatSwPerson),
    };
  }
}
