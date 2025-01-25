import z from "zod";

const messages = {
  username: {
    required: "Usuário é obrigatório",
  },
  password: {
    required: "Senha é obrigatória",
  },
};

export const signInSchema = z.object({
  username: z
    .string({ required_error: messages.username.required })
    .min(1, { message: messages.username.required }),
  password: z
    .string({ required_error: messages.password.required })
    .min(1, { message: messages.password.required }),
});
