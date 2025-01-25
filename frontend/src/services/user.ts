import { api } from "./api";

export interface UserRaw {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends UserRaw {
  createdAtFormatted: string;
  updatedAtFormatted: string;
}

export interface ListUsersParams {
  page?: number;
}

export interface ListUsersRawOutput {
  items: UserRaw[];
  total: number;
}

export interface ListUsersOutput {
  items: User[];
  total: number;
}

export interface CreateUserInput {
  name: string;
  username: string;
  password: string;
}

function formatUser(raw: UserRaw): User {
  return {
    ...raw,
    createdAtFormatted: new Date(raw.createdAt).toLocaleString(),
    updatedAtFormatted: new Date(raw.updatedAt).toLocaleString(),
  };
}

export class UserService {
  static build(): UserService {
    return new UserService();
  }

  async list(params: ListUsersParams): Promise<ListUsersOutput> {
    const { page = 1 } = params;
    const response = await api.get<ListUsersRawOutput>(`/users`, {
      params: { page },
    });
    const { items, total } = response.data;
    return {
      items: items.map(formatUser),
      total,
    };
  }

  async create(input: CreateUserInput): Promise<User> {
    const response = await api.post<UserRaw>("/users", input);
    return formatUser(response.data);
  }
}
