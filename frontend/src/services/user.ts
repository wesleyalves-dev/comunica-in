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

export interface ListUsersOutput<Type> {
  items: Type[];
  total: number;
}

export interface CreateUserInput {
  name: string;
  username: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  username?: string;
  password?: string;
}

export class UserService {
  static build(): UserService {
    return new UserService();
  }

  private formatUser(raw: UserRaw): User {
    return {
      ...raw,
      createdAtFormatted: new Date(raw.createdAt).toLocaleString(),
      updatedAtFormatted: new Date(raw.updatedAt).toLocaleString(),
    };
  }

  async list(params: ListUsersParams): Promise<ListUsersOutput<User>> {
    const { page = 1 } = params;
    const response = await api.get<ListUsersOutput<UserRaw>>(`/users`, {
      params: { page },
    });
    const { items, total } = response.data;
    return {
      items: items.map(this.formatUser),
      total,
    };
  }

  async get(id: string): Promise<User> {
    const response = await api.get<UserRaw>(`/users/${id}`);
    return this.formatUser(response.data);
  }

  async create(input: CreateUserInput): Promise<User> {
    const response = await api.post<UserRaw>("/users", input);
    return this.formatUser(response.data);
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const response = await api.put<UserRaw>(`/users/${id}`, input);
    return this.formatUser(response.data);
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
}
