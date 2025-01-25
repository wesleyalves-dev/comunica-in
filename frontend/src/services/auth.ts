import { api } from "./api";

export interface SignInInput {
  username: string;
  password: string;
}

export class AuthService {
  static build(): AuthService {
    return new AuthService();
  }

  async signIn(input: SignInInput): Promise<void> {
    await api.post("/auth/sign-in", input);
  }
}
